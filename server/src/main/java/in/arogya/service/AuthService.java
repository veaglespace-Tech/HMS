package in.arogya.service;

import in.arogya.common.exception.ResourceNotFoundException;
import in.arogya.common.security.JwtService;
import in.arogya.dto.auth.AuthRequest;
import in.arogya.dto.auth.AuthResponse;
import in.arogya.entity.User;
import in.arogya.entity.UserHospitalRole;
import in.arogya.repository.UserHospitalRoleRepository;
import in.arogya.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final UserHospitalRoleRepository userHospitalRoleRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    public AuthResponse login(AuthRequest request) {
        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new ResourceNotFoundException("Invalid email or password"));

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new ResourceNotFoundException("Invalid email or password");
        }

        if (!user.isActive()) {
            throw new IllegalStateException("User account is disabled");
        }

        List<UserHospitalRole> userRoles = userHospitalRoleRepository.findByUserIdAndActiveTrue(user.getId());
        
        List<String> roles = userRoles.stream()
                .map(uhr -> uhr.getRole().getCode())
                .collect(Collectors.toList());

        boolean isPlatformUser = user.isPlatformUser();
        String hospitalId = null;

        if (!isPlatformUser && !userRoles.isEmpty()) {
            // Usually a user is associated with one hospital context at a time, taking the first one
            hospitalId = userRoles.get(0).getHospitalId();
        }

        String token = jwtService.generateToken(
                user.getId(),
                hospitalId,
                roles,
                isPlatformUser
        );

        AuthResponse.UserDto userDto = AuthResponse.UserDto.builder()
                .id(user.getId())
                .email(user.getEmail())
                .username(user.getFirstName() + " " + user.getLastName())
                .hospitalId(hospitalId)
                .roles(roles)
                .isPlatformUser(isPlatformUser)
                .build();

        return AuthResponse.builder()
                .token(token)
                .user(userDto)
                .build();
    }
}
