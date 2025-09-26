@echo off
echo Substituindo arquivos do sistema de autenticacao...

echo 1. Substituindo App.jsx...
copy /Y "c:\Users\Carlos\sabia2\src\App.jsx.new" "c:\Users\Carlos\sabia2\src\App.jsx"

echo 2. Substituindo Layout.jsx...
copy /Y "c:\Users\Carlos\sabia2\src\components\Layout.jsx.new" "c:\Users\Carlos\sabia2\src\components\Layout.jsx"

echo 3. Substituindo FooterNav.jsx...
copy /Y "c:\Users\Carlos\sabia2\src\components\FooterNav.jsx.new" "c:\Users\Carlos\sabia2\src\components\FooterNav.jsx"

echo 4. Substituindo Navbar.jsx...
copy /Y "c:\Users\Carlos\sabia2\src\components\Navbar.jsx.new" "c:\Users\Carlos\sabia2\src\components\Navbar.jsx"

echo 5. Substituindo AdminDashboard.jsx...
copy /Y "c:\Users\Carlos\sabia2\src\pages\AdminDashboard.jsx.new" "c:\Users\Carlos\sabia2\src\pages\AdminDashboard.jsx"

echo 6. Substituindo Store de autenticacao...
copy /Y "c:\Users\Carlos\sabia2\src\stores\index.js.new" "c:\Users\Carlos\sabia2\src\stores\index.js"

echo 7. Substituindo Supabase services...
copy /Y "c:\Users\Carlos\sabia2\src\services\supabase.js.new" "c:\Users\Carlos\sabia2\src\services\supabase.js"

echo 6. Removendo arquivos de autenticacao...
if exist "c:\Users\Carlos\sabia2\src\components\ProtectedRoute.jsx" del "c:\Users\Carlos\sabia2\src\components\ProtectedRoute.jsx"
if exist "c:\Users\Carlos\sabia2\src\components\DebugAdminOverride.jsx" del "c:\Users\Carlos\sabia2\src\components\DebugAdminOverride.jsx"
if exist "c:\Users\Carlos\sabia2\src\pages\LoginPage.jsx" del "c:\Users\Carlos\sabia2\src\pages\LoginPage.jsx"
if exist "c:\Users\Carlos\sabia2\src\pages\admin\DiagnosticoAdmin.jsx" del "c:\Users\Carlos\sabia2\src\pages\admin\DiagnosticoAdmin.jsx"

echo 8. Limpando arquivos temporarios...
del "c:\Users\Carlos\sabia2\src\App.jsx.new"
del "c:\Users\Carlos\sabia2\src\components\Layout.jsx.new"
del "c:\Users\Carlos\sabia2\src\components\FooterNav.jsx.new"
del "c:\Users\Carlos\sabia2\src\components\Navbar.jsx.new"
del "c:\Users\Carlos\sabia2\src\pages\AdminDashboard.jsx.new"
del "c:\Users\Carlos\sabia2\src\stores\index.js.new"
del "c:\Users\Carlos\sabia2\src\services\supabase.js.new"

echo Sistema de autenticacao removido com sucesso!
echo Por favor, execute "npm run dev" para iniciar a aplicacao.