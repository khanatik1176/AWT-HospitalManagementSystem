@echo off
cd hms-backend-org
start cmd /k "npm update"
cd ..
cd hms-backend-sa
start cmd /k "npm update"
cd ..
cd hms-frontend
start cmd /k "npm update"
