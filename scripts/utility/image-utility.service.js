var imageUtilityService = new function(){
    var imgDownload;

    this.loadImage = function(imgUrl, imgElement){
        if (imgDownload) { imgDownload.onload = null }
        
        imgDownload = new Image();

        imgElement.src = '';
        imgElement.style.opacity = 0;

        imgDownload.src = imgUrl;
        imgDownload.onload = function (){
            imgElement.src = this.src;
            imgElement.style.opacity = 1;
        }
    }
}