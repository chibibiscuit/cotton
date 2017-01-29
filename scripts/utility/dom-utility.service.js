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
        imgElement.alt = image.title;
        imgElement.title = image.title;

        imageUtilityService.loadImage(
            flickrService.getImageUrl(image, 1),
            imgElement,
            true
        ).catch(toast.error);

        return imgElement;
    }

    function onImgClick(imgId){
        document.getElementById('modal-backdrop').style.display = 'block';
        document.body.className = 'modal-active';

        window.currentImage = imgId;
        
        imageUtilityService.loadImage(
            flickrService.getImageUrl(window.imgHash[currentImage], 2),
            document.getElementById('modal-img-element')
        ).catch(toast.error);

        document.getElementById('modal-img-title').innerText = window.imgHash[window.currentImage].title;
    }
}