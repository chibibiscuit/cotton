![Cotton Logo](content/cotton_logo_l_dark.png "Cotton Logo") 
## Lightweight Image Viewer 


### Goal

The original goal was to create an image lightbox with vanilla Javascript and CSS, however I felt it was necessary to provide a context for the lightbox to exist in.

### Functionality

The application will load 12 images from the provided Flickr photoset initially, and after clicking the 'Load More' button, it will lazy-load images from Flickr (12 at a time) until the entire photoset has been loaded. Clicking an image will open the lightbox (which displays the title and the full-resolution image). The lightbox contains buttons to navigate to both the next and previous picture, in addition to a close button (the lightbox can also be closed by clicking anywhere outside the image and the other buttons). The images can also be changed using the `<-` and `->` keys, and the lightbox can also be closed using the `ESC` key.

The application is also prepared to deal with the following contingencies:

* Flickr is unable to return the list of photos.
* Flickr is unable to load the photos in the photoset.
* The user attempts to go to the previous / next photo when currently viewing the first / last photo.

### Contact Information

For questions or requests regarding this code, please contact Nathan Wilson at [natwilso@gmail.com](mailto:natwilso@gmail.com).

### Licensing

Copyright 2017 - Nathan Wilson

<a rel="license" href="http://creativecommons.org/licenses/by/4.0/"><img alt="Creative Commons License" style="border-width:0" src="https://i.creativecommons.org/l/by/4.0/88x31.png" /></a><br />This work is licensed under a <a rel="license" href="http://creativecommons.org/licenses/by/4.0/">Creative Commons Attribution 4.0 International License</a>.

Created with love as a code example for [Patreon.com](http://www.patreon.com). Thank you all for the opportunity, and for your consideration.