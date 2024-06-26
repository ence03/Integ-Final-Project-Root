<!DOCTYPE html>
<html>
<head>
    <title>Enroll Student</title>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css">
    <link rel="stylesheet" href="https://code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css">
    <script src="https://code.jquery.com/jquery-3.3.1.min.js"></script>
    <script src="https://code.jquery.com/ui/1.12.1/jquery-ui.min.js"></script>
    <script>
        $(document).ready(function() {
            console.log('Document ready.');

            // Autocomplete for Student ID
            $('#StudentIDInput').autocomplete({
                source: function(request, response) {
                    console.log('Autocomplete request for StudentID:', request.term);
                    $.ajax({
                        url: '{{ route("students.filter") }}',
                        type: 'GET',
                        data: { StudentID: request.term },
                        success: function(data) {
                            console.log('Autocomplete success for StudentID:', data);
                            response($.map(data, function(student) {
                                return {
                                    label: student.StudentID + " - " + student.FirstName + " " + student.LastName,
                                    value: student.StudentID,
                                    studentName: student.FirstName + " " + student.LastName
                                };
                            }));
                        },
                        error: function(xhr, status, error) {
                            console.log('Autocomplete AJAX Error:', error);
                        }
                    });
                },
                select: function(event, ui) {
                    $('#StudentID').val(ui.item.value);
                    $('#StudentName').val(ui.item.studentName);
                },
                minLength: 2
            });

            // Autocomplete for Course ID
            $('#CourseIDInput').autocomplete({
                source: function(request, response) {
                    console.log('Autocomplete request for CourseID:', request.term);
                    $.ajax({
                        url: '{{ route("courses.filter") }}',
                        type: 'GET',
                        data: { CourseID: request.term },
                        success: function(data) {
                            console.log('Autocomplete success for CourseID:', data);
                            response($.map(data, function(course) {
                                return {
                                    label: course.CourseID + " - " + course.Description,
                                    value: course.CourseID,
                                    courseDescription: course.Description
                                };
                            }));
                        },
                        error: function(xhr, status, error) {
                            console.log('Autocomplete AJAX Error:', error);
                        }
                    });
                },
                select: function(event, ui) {
                    $('#CourseID').val(ui.item.value);
                    $('#CourseName').val(ui.item.courseDescription);

                    // Fetch instructors for the selected course
                    $.ajax({
                        url: '{{ route("course.instructors") }}',
                        type: 'GET',
                        data: { CourseID: ui.item.value },
                        success: function(data) {
                            console.log('Fetch Instructors success:', data);
                            $('#InstructorID').empty(); // Clear current options
                            $('#InstructorID').append($('<option>').text('Select Instructor').attr('value', ''));
                            $.each(data, function(index, instructor) {
                                $('#InstructorID').append($('<option>').text(instructor.FirstName + ' ' + instructor.LastName).attr('value', instructor.InstructorID));
                            });
                        },
                        error: function(xhr, status, error) {
                            console.log('Fetch Instructors AJAX Error:', error);
                        }
                    });
                }
            });

            // On change event for Instructor ID
            $('#InstructorID').change(function() {
                var courseID = $('#CourseID').val();
                var instructorID = $(this).val();

                // Fetch Course Instructor ID based on Course ID and Instructor ID
                $.ajax({
                    url: '{{ route("course.instructor.by.course.instructor") }}',
                    type: 'GET',
                    data: { CourseID: courseID, InstructorID: instructorID },
                    success: function(data) {
                        console.log('Fetch Course Instructor success:', data);
                        $('#Course_InstructorID').val(data.Course_InstructorID);
                    },
                    error: function(xhr, status, error) {
                        console.log('Fetch Course Instructor AJAX Error:', error);
                    }
                });
            });

            // Autocomplete for Course Instructor ID
            $('#Course_InstructorIDInput').autocomplete({
                source: function(request, response) {
                    $.ajax({
                        url: '{{ route("course_instructors.filter") }}',
                        type: 'GET',
                        data: { term: request.term },
                        success: function(data) {
                            console.log('Autocomplete success for Course Instructor:', data);
                            response($.map(data, function(courseInstructor) {
                                return {
                                    label: courseInstructor.Course_InstructorID + " - " + courseInstructor.instructor.FirstName + " " + courseInstructor.instructor.LastName,
                                    value: courseInstructor.Course_InstructorID,
                                    courseID: courseInstructor.course.CourseID,
                                    instructorName: courseInstructor.instructor.FirstName + " " + courseInstructor.instructor.LastName
                                };
                            }));
                        },
                        error: function(xhr, status, error) {
                            console.log('Autocomplete AJAX Error:', error);
                        }
                    });
                },
                select: function(event, ui) {
                    $('#Course_InstructorID').val(ui.item.value);
                    $('#CourseID').val(ui.item.courseID);
                    $('#InstructorName').val(ui.item.instructorName);
                },
                minLength: 2
            });

            // Form submission handling
            $('form').submit(function(event) {
                // event.preventDefault(); // Prevent default form submission for testing

                console.log('Form submitted.');

                // Validate that hidden fields are correctly populated
                console.log('StudentID:', $('#StudentID').val());
                console.log('CourseID:', $('#CourseID').val());
                console.log('InstructorID:', $('#InstructorID').val());
                console.log('Course_InstructorID:', $('#Course_InstructorID').val());

                // Uncomment below to submit form for actual test
                // this.submit();
            });

            // Initial AJAX call
            $.ajax({
                url: '{{ route("courses.filter") }}',
                type: 'GET',
                success: function(data) {
                    console.log('Initial AJAX success:', data);
                    response($.map(data, function(course) {
                        return {
                            label: course.CourseID + " - " + course.CourseName,
                            value: course.CourseID,
                            courseName: course.CourseName
                        };
                    }));
                },
                error: function(xhr, status, error) {
                    console.log('Initial AJAX Error:', error);
                }
            });

        });
    </script>
</head>
<body>
<div class="container">
    <h2>Enroll Student</h2>
    
    <!-- Success message -->
    @if(session('success'))
        <div class="alert alert-success">
            {{ session('success') }}
        </div>
    @endif
    
    <form action="{{ route('enrollments.store') }}" method="POST">
        @csrf
        <div class="form-group">
            <label for="Year_SemID">Year Semester:</label>
            <select class="form-control" id="Year_SemID" name="Year_SemID" required>
                @foreach($yearSemesters as $yearSemester)
                    <option value="{{ $yearSemester->Year_SemID }}">{{ $yearSemester->YearLevel }} - {{ $yearSemester->Sem }}</option>
                @endforeach
            </select>
        </div>
        <div class="form-group">
            <label for="StudentIDInput">Student ID:</label>
            <input type="text" class="form-control" id="StudentIDInput" name="StudentIDInput" placeholder="Type student ID" required>
            <input type="hidden" id="StudentID" name="StudentID">
        </div>
        <div class="form-group">
            <label for="StudentName">Student Name:</label>
            <input type="text" class="form-control" id="StudentName" name="StudentName" placeholder="Input Student ID" readonly>
        </div>
        <div class="form-group">
            <label for="CourseIDInput">Course ID:</label>
            <input type="text" class="form-control" id="CourseIDInput" name="CourseIDInput" placeholder="Type course ID" required>
            <input type="hidden" id="CourseID" name="CourseID">
        </div>
        <div class="form-group">
            <label for="CourseName">Course Description:</label>
            <input type="text" class="form-control" id="CourseName" name="CourseName" placeholder="Input Course ID" readonly>
        </div>
        <div class="form-group">
            <label for="InstructorID">Instructor:</label>
            <select class="form-control" id="InstructorID" name="InstructorID" required>
                <option value="">Select Instructor</option>
            </select>
        </div>
        <div class="form-group">
            <label for="Course_InstructorID">Course Instructor ID:</label>
            <input type="text" class="form-control" id="Course_InstructorID" name="Course_InstructorID" placeholder="Select Course and Instructor" readonly>
        </div>
        @if(session('error'))
        <div class="alert alert-danger mt-3">
            {{ session('error') }}
        </div>
        @endif
        <button type="submit" class="btn btn-primary">Enroll</button>
    </form>
</div>
</body>
</html>
