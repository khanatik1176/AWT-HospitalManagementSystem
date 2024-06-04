@echo off
cd hms-backend-org
start cmd /k "npm run start:dev"
cd ..
cd hms-backend-sa
start cmd /k "npm run start:dev"
cd ..
cd hms-frontend
start cmd /k "npm run dev"