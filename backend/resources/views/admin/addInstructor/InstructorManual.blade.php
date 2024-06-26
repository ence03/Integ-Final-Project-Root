<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Manual Instructor Entry</title>
    <link rel="stylesheet" href="{{ asset('css/app.css') }}">
    <!-- Add Bootstrap CSS -->
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
</head>
<body>
    <div class="container mt-5">
        <h1 class="mb-4">Manual Instructor Entry</h1>
        <form action="{{ route('admin.addInstructor.store') }}" method="POST">
            @csrf
            <div class="form-row">
                <div class="form-group col-md-6">
                    <label for="UserID">User ID</label>
                    <select class="form-control" id="UserID" name="UserID" required>
                        <option value="">Select User</option>
                        @foreach($users as $user)
                            <option value="{{ $user->UserID }}">{{ $user->UserID }} - {{ $user->name }}</option>
                        @endforeach
                    </select>
                </div>
                <div class="form-group col-md-6">
                    <label for="NextInstructorID">Next Instructor ID</label>
                    <input type="text" class="form-control" id="NextInstructorID" name="NextInstructorID" value="{{ $nextInstructorID }}" readonly>
                </div>
            </div>
            <div class="form-row">
                <div class="form-group col-md-6">
                    <label for="FirstName">First Name</label>
                    <input type="text" class="form-control" id="FirstName" name="FirstName" required>
                </div>
                <div class="form-group col-md-6">
                    <label for="MiddleName">Middle Name</label>
                    <input type="text" class="form-control" id="MiddleName" name="MiddleName">
                </div>
            </div>
            <div class="form-row">
                <div class="form-group col-md-6">
                    <label for="LastName">Last Name</label>
                    <input type="text" class="form-control" id="LastName" name="LastName" required>
                </div>
                <div class="form-group col-md-6">
                    <label for="Email">Email</label>
                    <input type="email" class="form-control" id="Email" name="Email" required>
                </div>
            </div>
            <div class="form-group">
                <label for="Address">Address</label>
                <input type="text" class="form-control" id="Address" name="Address">
            </div>
            <button type="submit" class="btn btn-primary">Submit</button>
        </form>

        <!-- Ensure the options for select are within the select element -->
        
    </div>
    <!-- Add Bootstrap JS and dependencies -->
    <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.5.4/dist/umd/popper.min.js"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>
</body>
</html>
