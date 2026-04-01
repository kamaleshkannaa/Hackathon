$baseDir = "e:\bus-booking-app\bus-frontend"
$srcDir = "$baseDir\src"
$bakDir = "$baseDir\src_bak"

# 1. Backup old src
if (Test-Path $srcDir) {
    if (Test-Path $bakDir) {
        Remove-Item $bakDir -Recurse -Force
    }
    Rename-Item $srcDir -NewName "src_bak"
}

# 2. Create new src and folders
$dirs = @(
    "assets\images",
    "assets\styles",
    "components\common",
    "config",
    "context",
    "hooks",
    "services",
    "utils",
    "portals\user\components\auth",
    "portals\user\components\search",
    "portals\user\components\seat",
    "portals\user\components\booking",
    "portals\user\pages",
    "portals\user\layout",
    "portals\admin\components\auth",
    "portals\admin\components\dashboard",
    "portals\admin\components\bus",
    "portals\admin\components\route",
    "portals\admin\components\schedule",
    "portals\admin\components\seat",
    "portals\admin\components\booking",
    "portals\admin\pages",
    "portals\admin\layout"
)

foreach ($d in $dirs) {
    New-Item -ItemType Directory -Force -Path "$srcDir\$d" | Out-Null
}

function Create-JsxFile {
    param($Path, $Name)
    $Content = @"
export default function $Name() {
  return (
    <div>$Name Component</div>
  );
}
"@
    Set-Content -Path "$srcDir\$Path" -Value $Content
}

function Create-JsFile {
    param($Path)
    $Content = "// File created from script`nexport const tmp = {};"
    Set-Content -Path "$srcDir\$Path" -Value $Content
}

function Create-CssFile {
    param($Path)
    $Content = "/* CSS File */"
    Set-Content -Path "$srcDir\$Path" -Value $Content
}

# 3. Create Files
Create-CssFile "assets\styles\admin.css"

Create-JsxFile "components\common\LoadingSpinner.jsx" "LoadingSpinner"
Create-JsxFile "components\common\ErrorMessage.jsx" "ErrorMessage"
Create-JsxFile "components\common\Modal.jsx" "Modal"
Create-JsxFile "components\common\Button.jsx" "Button"

Create-JsFile "config\api.js"
Create-JsFile "config\routes.js"

Create-JsxFile "context\AuthContext.jsx" "AuthContext"
Create-JsxFile "context\BookingContext.jsx" "BookingContext"

Create-JsFile "hooks\useAuth.js"
Create-JsFile "hooks\useApi.js"
Create-JsFile "hooks\useRoleCheck.js"

Create-JsFile "services\authService.js"
Create-JsFile "services\userService.js"
Create-JsFile "services\busService.js"
Create-JsFile "services\bookingService.js"
Create-JsFile "services\adminService.js"

Create-JsFile "utils\constants.js"
Create-JsFile "utils\validators.js"
Create-JsFile "utils\roleUtils.js"

Create-JsxFile "portals\user\UserApp.jsx" "UserApp"
Create-JsxFile "portals\user\layout\UserLayout.jsx" "UserLayout"
Create-JsxFile "portals\user\layout\UserNavbar.jsx" "UserNavbar"

Create-JsxFile "portals\user\pages\HomePage.jsx" "HomePage"
Create-JsxFile "portals\user\pages\LoginPage.jsx" "LoginPage"
Create-JsxFile "portals\user\pages\RegisterPage.jsx" "RegisterPage"
Create-JsxFile "portals\user\pages\SearchResultsPage.jsx" "SearchResultsPage"
Create-JsxFile "portals\user\pages\SeatSelectionPage.jsx" "SeatSelectionPage"
Create-JsxFile "portals\user\pages\BookingPage.jsx" "BookingPage"
Create-JsxFile "portals\user\pages\MyBookingsPage.jsx" "MyBookingsPage"
Create-JsxFile "portals\user\pages\ProfilePage.jsx" "ProfilePage"

Create-JsxFile "portals\user\components\auth\LoginForm.jsx" "LoginForm"
Create-JsxFile "portals\user\components\auth\RegisterForm.jsx" "RegisterForm"
Create-JsxFile "portals\user\components\auth\ProtectedRoute.jsx" "ProtectedRoute"

Create-JsxFile "portals\user\components\search\SearchForm.jsx" "SearchForm"
Create-JsxFile "portals\user\components\search\BusCard.jsx" "BusCard"
Create-JsxFile "portals\user\components\search\SearchResults.jsx" "SearchResults"

Create-JsxFile "portals\user\components\seat\SeatLayout.jsx" "SeatLayout"
Create-JsxFile "portals\user\components\seat\Seat.jsx" "Seat"
Create-JsxFile "portals\user\components\seat\PassengerForm.jsx" "PassengerForm"

Create-JsxFile "portals\user\components\booking\BookingSummary.jsx" "BookingSummary"
Create-JsxFile "portals\user\components\booking\PaymentMock.jsx" "PaymentMock"
Create-JsxFile "portals\user\components\booking\BookingConfirmation.jsx" "BookingConfirmation"

Create-JsxFile "portals\admin\AdminApp.jsx" "AdminApp"
Create-JsxFile "portals\admin\layout\AdminLayout.jsx" "AdminLayout"
Create-JsxFile "portals\admin\layout\AdminSidebar.jsx" "AdminSidebar"
Create-JsxFile "portals\admin\layout\AdminHeader.jsx" "AdminHeader"

Create-JsxFile "portals\admin\pages\AdminLoginPage.jsx" "AdminLoginPage"
Create-JsxFile "portals\admin\pages\DashboardPage.jsx" "DashboardPage"
Create-JsxFile "portals\admin\pages\BusManagementPage.jsx" "BusManagementPage"
Create-JsxFile "portals\admin\pages\RouteManagementPage.jsx" "RouteManagementPage"
Create-JsxFile "portals\admin\pages\ScheduleManagementPage.jsx" "ScheduleManagementPage"
Create-JsxFile "portals\admin\pages\BookingManagementPage.jsx" "BookingManagementPage"
Create-JsxFile "portals\admin\pages\AdminProfilePage.jsx" "AdminProfilePage"

Create-JsxFile "portals\admin\components\auth\AdminLogin.jsx" "AdminLogin"
Create-JsxFile "portals\admin\components\auth\AdminProtectedRoute.jsx" "AdminProtectedRoute"

Create-JsxFile "portals\admin\components\dashboard\StatsCard.jsx" "StatsCard"
Create-JsxFile "portals\admin\components\dashboard\RecentBookings.jsx" "RecentBookings"
Create-JsxFile "portals\admin\components\dashboard\RevenueChart.jsx" "RevenueChart"

Create-JsxFile "portals\admin\components\bus\BusList.jsx" "BusList"
Create-JsxFile "portals\admin\components\bus\BusForm.jsx" "BusForm"
Create-JsxFile "portals\admin\components\bus\BusDetails.jsx" "BusDetails"

Create-JsxFile "portals\admin\components\route\RouteList.jsx" "RouteList"
Create-JsxFile "portals\admin\components\route\RouteForm.jsx" "RouteForm"
Create-JsxFile "portals\admin\components\route\RouteMap.jsx" "RouteMap"

Create-JsxFile "portals\admin\components\schedule\ScheduleList.jsx" "ScheduleList"
Create-JsxFile "portals\admin\components\schedule\ScheduleForm.jsx" "ScheduleForm"
Create-JsxFile "portals\admin\components\schedule\ScheduleCalendar.jsx" "ScheduleCalendar"

Create-JsxFile "portals\admin\components\seat\SeatManager.jsx" "SeatManager"

Create-JsxFile "portals\admin\components\booking\AllBookings.jsx" "AllBookings"
Create-JsxFile "portals\admin\components\booking\BookingDetails.jsx" "BookingDetails"

# 4. Migrate old files
if (Test-Path "$bakDir\main.jsx") { Copy-Item "$bakDir\main.jsx" "$srcDir\main.jsx" -Force }
if (Test-Path "$bakDir\App.jsx") { Copy-Item "$bakDir\App.jsx" "$srcDir\App.jsx" -Force }
if (Test-Path "$bakDir\index.css") { Copy-Item "$bakDir\index.css" "$srcDir\assets\styles\index.css" -Force }

# Note: The user edited these files heavily, copying them into their new destination
if (Test-Path "$bakDir\components\seat\SeatLayout.jsx") { Copy-Item "$bakDir\components\seat\SeatLayout.jsx" "$srcDir\portals\user\components\seat\SeatLayout.jsx" -Force }
if (Test-Path "$bakDir\components\booking\BookingSummary.jsx") { Copy-Item "$bakDir\components\booking\BookingSummary.jsx" "$srcDir\portals\user\components\booking\BookingSummary.jsx" -Force }
if (Test-Path "$bakDir\components\auth") { Copy-Item "$bakDir\components\auth\*" "$srcDir\portals\user\components\auth\" -Recurse -Force }
if (Test-Path "$bakDir\components\common\LoadingSpinner.jsx") { Copy-Item "$bakDir\components\common\LoadingSpinner.jsx" "$srcDir\components\common\LoadingSpinner.jsx" -Force }
if (Test-Path "$bakDir\components\common\ErrorMessage.jsx") { Copy-Item "$bakDir\components\common\ErrorMessage.jsx" "$srcDir\components\common\ErrorMessage.jsx" -Force }

Write-Host "Re-architecture completed!"
