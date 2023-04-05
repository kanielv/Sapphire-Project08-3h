import React from 'react';
import DisplayDiagramModal from '../modals/DisplayDiagramModal'

const ImagesLogo = ({setHoverImage, handleImage}) => {
  
  return (
    <div> 
      <svg width="30" height="20px" viewBox="0 -2 20 20" version="1.1"
              onMouseEnter={() => setHoverImage(true)}
              onMouseLeave={() => setHoverImage(false)}
              onClick={handleImage}
               xmlns="http://www.w3.org/2000/svg">
          <defs>
      </defs>
          <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
              <g id="Dribbble-Light-Preview" transform="translate(-380.000000, -3881.000000)" fill="#000000">
                  <g id="icons" transform="translate(56.000000, 160.000000)">
                      <path d="M336,3725.5 C336,3724.948 336.448,3724.5 337,3724.5 C337.552,3724.5 338,3724.948 338,3725.5 C338,3726.052 337.552,3726.5 337,3726.5 C336.448,3726.5 336,3726.052 336,3725.5 L336,3725.5 Z M340,3733 L328,3733 L332.518,3726.812 L335.354,3730.625 L336.75,3728.75 L340,3733 Z M326,3735 L342,3735 L342,3723 L326,3723 L326,3735 Z M324,3737 L344,3737 L344,3721 L324,3721 L324,3737 Z" id="image_picture-[#972]">

      </path>
                  </g>
              </g>
          </g>
      </svg>
    </div>
  );
};

export default ImagesLogo;
