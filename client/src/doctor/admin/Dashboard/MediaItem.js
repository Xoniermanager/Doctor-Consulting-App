import React from "react";

const MediaItem = ({data}) => {

    
  return (
    <>
      <div className="col-xl-3 col-xxl-4 col-sm-4">
        <div className="card gradient-bx text-white bg-danger rounded">
          <div className="card-body" style={{background : data.bcolor}}>
            <div className="media align-items-center">
              <div className="media-body">
                <p className="mb-1">{data.title}</p>
                <div className="d-flex flex-wrap">
                  <h2 className="fs-40 font-w600 text-white mb-0 mr-3">{data.dataCount}</h2>
                  <div>
                    <svg
                      width="28"
                      height="19"
                      viewBox="0 0 28 19"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                     <path
                        d={data.sign}
                        fill="url(#paint0_linear4)" />
                      <path
                        d={data.sign2}
                        stroke="white" stroke-width="2"
                      />
                      <defs>
                        <linearGradient
                          id="paint0_linear4"
                          x1="13.7187"
                          y1="3.0625"
                          x2="14.7499"
                          y2="17.5"
                          gradientUnits="userSpaceOnUse"
                        >
                          <stop
                            stop-color="white"
                            stop-opacity="0.73"
                            offset="0.1"
                          />
                          <stop
                            offset="1"
                            stop-color="white"
                            stop-opacity="0"
                          />
                        </linearGradient>
                      </defs>
                    </svg>
                    <div className="fs-14">{data.incDcr}%</div>
                  </div>
                </div>
              </div>
              <span className="border rounded-circle p-4">
                <svg
                  width="34"
                  height="34"
                  viewBox="0 0 34 34"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d={data.dataIcon}
                    fill="white"
                  />
                </svg>
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MediaItem;
