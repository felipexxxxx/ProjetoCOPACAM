@echo off

REM Navegar até o diretório do projeto
cd /d "C:\Users\felip\Desktop\COPACAM CODIGO\Projeto Completo\reference-generator"

REM Rodar o Spring Boot com Maven (em segundo plano)
start "" mvn spring-boot:run

REM Esperar que o Spring Boot seja iniciado (espera 10 segundos para garantir que o servidor suba)
timeout /t 15

REM Abrir a página HTML no Google Chrome
start "" "%ProgramFiles%\Google\Chrome\Application\chrome.exe" "http://localhost:8080/index.html"
