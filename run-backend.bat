@echo off
echo ===================================================
echo   Starting Arogya HMS — Backend (Spring Boot)
echo ===================================================
cd /d "%~dp0backend"
set "PATH=C:\Users\kaver\.m2\apache-maven-3.9.6\bin;%PATH%"
mvn spring-boot:run -pl app
pause
