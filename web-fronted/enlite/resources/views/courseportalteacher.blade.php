<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.css">
    <title>Dashboard</title>
    <style>
        body {
            display: flex;
            height: 100vh;
            margin: 0;
            font-family: Arial, sans-serif;
        }

        .sidebar {
            width: 200px;
            background-color: #fff;
            color: #fff;
            display: flex;
            flex-direction: column;
            align-items: center;
            padding-top: 21px;
            position: fixed;
            top: 0;
            left: 0;
            height: 100%;
            transform: translateX(-100%);
            transition: transform 0.3s ease;
            z-index: 1000;
            overflow-y: auto;
            margin-top: 5rem;
        }

        .sidebar.active {
            transform: translateX(0);
        }

        .sidebar ul {
            list-style-type: none;
            padding: 0;
            margin: 0;
        }

        .sidebar ul li {
            width: 100%;
            text-align: left;
            padding: 15px 20px;
            box-sizing: border-box;
            transition: background-color 0.3s ease, color 0.3s ease;
        }

        .sidebar ul li.active {
            background-color: #001B50;
            border-radius: 20px;
            width: calc(auto - 2px);
        }

        .sidebar ul li.active a {
            color: #fff;
            font-weight: bold;
        }

        .sidebar ul li a {
            color: #000;
            text-decoration: none;
            display: block;
        }

        .sidebar ul li:hover {
            background-color: #FEC619;
            border-radius: 20px;
            width: calc(auto - 2px);
        }

        .sidebar ul li:hover a {
            color: #fff;
        }

        .main-content {
            flex: 1;
            display: flex;
            flex-direction: column;
            transition: margin-left 0.3s ease;
        }

        .main-content.shifted {
            margin-left: 200px;
        }

        .top-bar {
            height: 50px;
            background-color: #8ECAE6;
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 20px 100px 10px 0px;
            border-bottom: 1px solid #ccc;
        }

        .top-bar ion-icon {
            font-size: 24px;
            cursor: pointer;
        }

        .top-bar .logo-container {
            display: flex;
            align-items: center;
            height: 100%;
        }

        .top-bar .logo {
            height: 70px;
            max-height: 100%;
            margin-left: 10px;
            width: auto;
            margin-right: 100rem;
        }

        .dropdown {
            position: relative;
            display: inline-block;
            margin-right: 20px;
        }

        .dropdown-content {
            display: none;
            position: absolute;
            background-color: #fff;
            min-width: 120px;
            box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
            z-index: 1;
            right: 0;
            top: 100%;
        }

        .dropdown-content a {
            color: #333 !important;
            padding: 12px 16px;
            text-decoration: none;
            display: block;
            text-align: left;
        }

        .dropdown-content a:hover {
            background-color: #FEC619;
            color: #000 !important;
        }

        .dropdown:hover .dropdown-content {
            display: block;
        }

        .dashboard-container {
            display: flex;
            flex-direction: column;
            padding: 20px;
            margin-left: 2rem;
        }

        .header-buttons-container {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 1rem;
        }

        .dashboard-p {
            font-family: Arial, sans-serif;
            font-size: 35px;
            font-weight: bold;
            color: #000;
            margin: 0;
        }

        table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 1rem;
        }

        table th, table td {
            padding: 10px;
            text-align: left;
            border-bottom: 1px solid #ddd;
        }

        table th {
            background-color: #f2f2f2;
        }

        .buttons {
            display: flex;
            gap: 10px;
            margin-left: 96rem;
        }

        .buttons button {
            padding: 10px 20px;
            border: none;
            border-radius: 10px;
            cursor: pointer;

        }

        .add-student {
            background-color: #ffc619;
            color: #fff;
        }

        .upload-csv {
            background-color: #ffc619;
            color: #fff;
        }

        .drop {
            background-color: #dc3545;
            color: #fff;
            display: none; /* Initially hide the drop button */
        }

        @media (max-width: 768px) {
            .sidebar {
                transform: translateX(-100%);
            }

            .sidebar.active {
                transform: translateX(0);
            }

            .main-content {
                margin-left: 0;
            }

            .main-content.shifted {
                margin-left: 200px;
            }

            .top-bar .logo {
                height: 30px;
            }

            .sidebar ul .dropdown {
                position: relative;
            }

            .sidebar ul .dropdown-content {
                display: none;
                position: absolute;
                left: 100%;
                top: 0;
                background-color: #fff;
                min-width: 200px;
                box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
                z-index: 1;
            }

            .sidebar ul .dropdown:hover .dropdown-content {
                display: block;
            }

            .sidebar ul .dropdown-content a {
                color: #000;
                padding: 12px 16px;
                text-decoration: none;
                display: block;
                background-color: #fff;
                transition: background-color 0.3s ease, color 0.3s ease;
            }

            .sidebar ul .dropdown-content a:hover {
                background-color: #001B50;
                color: #fff;
            }
        }
    </style>
</head>

<body>
    <div class="sidebar" id="sidebar">
        <ul>
            <li><a href="{{ route('welcome') }}">Dashboard</a></li>
            <li><a href="#">Profile</a></li>
            <li><a href="#">Notification</a></li>
            <li class="dropdown">
                <a href="#">Course & Student Management</a>
                <div class="dropdown-content">
                    <a href="#">Course Portal</a>
                    <a href="#">Course Management</a>
                </div>
            </li>
        </ul>
    </div>
    <div class="content-container">
        <div class="top-bar">
            <ion-icon name="menu-outline" id="burger-menu" style="color: #fff;"></ion-icon>
            <div class="logo-container">
                <img src="{{ asset('logo.png') }}" alt="EnLite" class="logo">
            </div>
            <div class="dropdown">
                <ion-icon name="person-circle-outline" id="user-menu" style="color: #000; margin-left:5rem;"></ion-icon>
                <div class="dropdown-content">
                    <a href="#">Profile</a>
                    <a href="#">Logout</a>
                </div>
            </div>
        </div>
        <div class="main-content" id="main-content">
            <div class="dashboard-container">
                <div class="header-buttons-container">
                    <h1 class="dashboard-p">Networking 1</h1>
                </div>
                <table>
                    <thead>
                        <tr>
                            <th></th>
                            <th>ID</th>
                            <th>LastName</th>
                            <th>FirstName</th>
                            <th>MiddleName</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><input type="checkbox" class="student-checkbox"></td>
                            <td>345</td>
                            <td>Ratunil</td>
                            <td>John Carlo</td>
                            <td>Ratunil</td>
                        </tr>
                        <tr>
                            <td><input type="checkbox" class="student-checkbox"></td>
                            <td>456</td>
                            <td>Deguino</td>
                            <td>Joshua</td>
                            <td>Deguino</td>
                        </tr>
                        <tr>
                            <td><input type="checkbox" class="student-checkbox"></td>
                            <td>987</td>
                            <td>Balagulan</td>
                            <td>Neczar</td>
                            <td>Balagulan</td>
                        </tr>
                        <tr>
                            <td><input type="checkbox" class="student-checkbox"></td>
                            <td>213</td>
                            <td>Amper</td>
                            <td>John Miko</td>
                            <td>Amper</td>
                        </tr>
                        <tr>
                            <td><input type="checkbox" class="student-checkbox"></td>
                            <td>345</td>
                            <td>Gomez</td>
                            <td>Mark</td>
                            <td>Gomez</td>
                        </tr>
                        <tr>
                            <td><input type="checkbox" class="student-checkbox"></td>
                            <td>898</td>
                            <td>Villa</td>
                            <td>Jonel</td>
                            <td>Villa</td>
                        </tr>
                    </tbody>
                
                </table>
                <div class="buttons">
                        <button class="add-student">Add Student</button>
                        <button class="upload-csv">Upload CSV</button>
                        <button class="drop" id="drop-button">Drop</button>
                    </div>
            </div>
        </div>
    </div>
    <script src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.js"></script>
    <script>
        document.getElementById('burger-menu').addEventListener('click', function () {
            document.getElementById('sidebar').classList.toggle('active');
            document.getElementById('main-content').classList.toggle('shifted');
        });

        document.getElementById('user-menu').addEventListener('click', function () {
            document.getElementById('user-dropdown').classList.toggle('show');
        });

        // Close the dropdown if the user clicks outside of it
        window.onclick = function (event) {
            if (!event.target.matches('#user-menu')) {
                var dropdowns = document.getElementsByClassName("dropdown-content");
                for (var i = 0; i < dropdowns.length; i++) {
                    var openDropdown = dropdowns[i];
                    if (openDropdown.classList.contains('show')) {
                        openDropdown.classList.remove('show');
                    }
                }
            }
        }

        // Show/Hide drop button based on checkbox selection
        const checkboxes = document.querySelectorAll('.student-checkbox');
        const dropButton = document.getElementById('drop-button');

        checkboxes.forEach(checkbox => {
            checkbox.addEventListener('change', function () {
                const anyChecked = Array.from(checkboxes).some(checkbox => checkbox.checked);
                dropButton.style.display = anyChecked ? 'block' : 'none';
            });
        });
    </script>
</body>

</html>
