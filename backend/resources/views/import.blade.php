<!DOCTYPE html>
<html>
<head>
    <title>Import CSV</title>
</head>
<body>
    <h1>Import Students CSV</h1>
    <form action="{{ route('import') }}" method="POST" enctype="multipart/form-data">
        @csrf
        <input type="file" name="file" accept=".csv">
        <button type="submit">Import CSV</button>
    </form>

    @if(session('success'))
        <p>{{ session('success') }}</p>
    @endif

    @if(session('error'))
        <p>{{ session('error') }}</p>
    @endif

    @if(session('warning'))
        <p>{!! nl2br(e(session('warning'))) !!}</p>
    @endif
</body>
</html>
