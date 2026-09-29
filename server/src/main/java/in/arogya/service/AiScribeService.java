package in.arogya.service;

import in.arogya.common.exception.ResourceNotFoundException;
import in.arogya.entity.ClinicalNote;
import in.arogya.entity.Encounter;
import in.arogya.entity.User;
import in.arogya.repository.ClinicalNoteRepository;
import in.arogya.repository.EncounterRepository;
import in.arogya.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Slf4j
public class AiScribeService {

    private final ClinicalNoteRepository clinicalNoteRepository;
    private final EncounterRepository encounterRepository;
    private final UserRepository userRepository;

    @Transactional
    public ClinicalNote processAndSaveNote(String encounterId, String authorId, String rawNote) {
        Encounter encounter = encounterRepository.findById(encounterId)
                .orElseThrow(() -> new ResourceNotFoundException("Encounter not found"));
        
        User author = userRepository.findById(authorId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        log.info("Processing raw note with AI Scribe for encounter {}", encounterId);
        
        // In a production environment, this would call an LLM API like OpenAI or Gemini:
        // String structuredPrompt = "Extract Chief Complaint, Diagnosis, and Treatment Plan from: " + rawNote;
        // String aiResponse = openAiClient.chat(structuredPrompt);
        
        // Simulated AI Processing & Structuring (Mock)
        String formattedContent = simulateLlmParsing(rawNote);

        // Update Encounter directly if needed (optional based on requirements)
        // Here we extract basic heuristics just to populate the Encounter fields
        if (formattedContent.contains("**Diagnosis:**")) {
            String dx = formattedContent.split("\\*\\*Diagnosis:\\*\\*")[1].split("\\*\\*")[0].trim();
            encounter.setDiagnosis(dx);
        }
        if (formattedContent.contains("**Chief Complaint:**")) {
            String cc = formattedContent.split("\\*\\*Chief Complaint:\\*\\*")[1].split("\\*\\*")[0].trim();
            encounter.setChiefComplaint(cc);
        }
        encounterRepository.save(encounter);

        // Create and save the Clinical Note
        ClinicalNote note = new ClinicalNote();
        note.setEncounter(encounter);
        note.setAuthor(author);
        note.setNoteType("AI_SCRIBE_NOTE");
        note.setContent(formattedContent);
        
        return clinicalNoteRepository.save(note);
    }
    
    private String simulateLlmParsing(String rawInput) {
        // This simulates an LLM extracting data into a standard SOAP/Medical format
        String lowerInput = rawInput.toLowerCase();
        
        String chiefComplaint = "General consultation";
        String diagnosis = "Pending evaluation";
        String treatment = "Standard care protocol";
        
        // Simple heuristic extraction for demonstration
        if (lowerInput.contains("fever") || lowerInput.contains("pain")) chiefComplaint = "Fever and generalized pain";
        if (lowerInput.contains("viral") || lowerInput.contains("infection")) diagnosis = "Viral Infection";
        if (lowerInput.contains("paracetamol") || lowerInput.contains("rest")) treatment = "Prescribed Paracetamol 500mg, recommended 3 days rest.";
        
        return String.format(
            "## AI Scribe Summary\n\n" +
            "**Chief Complaint:**\n%s\n\n" +
            "**Diagnosis:**\n%s\n\n" +
            "**Treatment Plan:**\n%s\n\n" +
            "---\n*Original Raw Note:* \n_%s_",
            chiefComplaint, diagnosis, treatment, rawInput
        );
    }
}
