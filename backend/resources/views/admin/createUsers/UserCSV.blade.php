<!DOCTYPE html>
<html>
<head>
    <title>Import User CSV</title>
</head>
<body>
    <h1>Import Users CSV</h1>
    <form method="POST" action="{{ route('import.users') }}" enctype="multipart/form-data">
        @csrf

        <div class="form-group">
            <label for="file">CSV File</label>
            <input type="file" id="file" name="file" class="form-control" required>
        </div>

        <button type="submit" class="btn btn-primary">Import</button>
    </form>

    @if(session('success'))
        <div style="color: green;">
            {!! nl2br(e(session('success'))) !!}
        </div>
    @endif

    @if(session('error'))
        <div style="color: red;">
            {{ session('error') }}
        </div>
    @endif

    @if(session('warning'))
        <div style="color: orange;">
            {!! nl2br(e(session('warning'))) !!}
        </div>
    @endif
</body>
</html>
