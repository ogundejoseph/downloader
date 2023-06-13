const fileInput = document.querySelector("input"),
downloadBtn = document.querySelector("button");

downloadBtn.addEventListener("click", (e) => {
    e.preventDefault();
    downloadBtn.innerText = "Downloading file...";
    fetchFile(fileInput.value);
});

function fetchFile(url) {
    // fetching file and returning response as blob
    fetch(url)
    .then(response => response.blob())
    .then(file => {
        // URL.createObjectURL creates a url of passed object
        let tempUrl = URL.createObjectURL(file);
        let aTag = document.createElement("a");
        aTag.href = tempUrl; // passing tempUrl as href value of <a> tag
        // passing file last name and extension as download value of <a> tag
        aTag.download = url.replace(/^.*[\\\/]/, '');
        document.body.appendChild(aTag); // adding <a> tag inside body
        aTag.click(); // clicking <a> tag so the file download
        aTag.remove(); // removing <a> tag once the file is downloading
        URL.revokeObjectURL(tempUrl); // removing tempURL from the document
        downloadBtn.innerText = "Download file";
    })
    .catch(() => {
        downloadBtn.innerText = "Download file";
        alert("Failed to download file!");
    })
}