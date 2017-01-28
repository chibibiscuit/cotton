var domUtilityService = new function(){
    this.initImgContainer = function(image, index) {
        var imgContainer = document.createElement('div');

        imgContainer.className = 'img-container';
        imgContainer.appendChild(this.initImgLink(image, index));

        return imgContainer;
    }

    this.initImgLink = function(image, index){
        var imgLink = document.createElement('a');
        
        imgLink.className = 'img-link';
        imgLink.addEventListener('click', function(){ onImgClick(index) });
        imgLink.appendChild(this.initImgElement(image));

        return imgLink;
    }

    this.initImgElement = function(image){
        var imgElement = document.createElement('img');
        imgDownload = new Image();

        imgElement.className = 'img-element';
        imgElement.height = '150';
        imgElement.width = '150';
        imgElement.alt = image.title;
        imgElement.title = image.title;

        imageUtilityService.loadImage(
            flickrService.getImageUrl(image, 3),
            imgElement,
            true
        );

        return imgElement;
    }

    function onImgClick(imgId){
        document.getElementById('modal-backdrop').style.display = 'block';
        document.body.className = 'modal-active';

        window.currentImage = imgId;
        
        imageUtilityService.loadImage(
            flickrService.getImageUrl(window.imgHash[currentImage], 2),
            document.getElementById('modal-img-element')
        );
    }
}