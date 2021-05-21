function getFileNameWithExt(event) {
    if (!event || !event.target || !event.target.files || event.target.files.length === 0) {
        return;
    }
    // const outputfile = document.getElementById('outputfile')
    // const extension = document.getElementById('extension')
    const name = event.target.files[0].name;
    const lastDot = name.lastIndexOf('.');
    const fileName = name.substring(0, lastDot);
    const ext = name.substring(lastDot + 1);
    outputfile.value = fileName;
    extension.value = ext;
    console.log(fileName);
    console.log(ext);
}