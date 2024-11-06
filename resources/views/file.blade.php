<html>
<body>
<form method="POST" action="/test" enctype="multipart/form-data">
    @csrf
    <div>
        <label for="video">Video:</label>
        <input type="file" name="video" id="video">
    </div>
    <button type="submit">Upload Video</button>
</form>
</body>
</html>
