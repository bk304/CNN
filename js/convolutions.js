//  ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ CONVOLUCOES COM 1 IMG      ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
function convolutionPixel(img, x, y, filter){
    let sum = 0;

    for(let i=-1; i<=1; i++){
        for(let j=-1; j<=1; j++){
            let factor = filter.data[i+1][j+1];
            sum += img.data[x + i][y + j] * factor;
        }
    }
    return sum;
}

function convolution(img, nnfilters){                                   // Apenas 1 imagem e Filtros 3x3x'nn.c_depth'
    let resized = new Matrix((img.rows+2),(img.cols+2));
    for(let i=1; i<(resized.rows - 1); i++){
        for(let j=1; j<(resized.cols - 1); j++){
            resized.data[i][j] = img.data[i-1][j-1]
        }
    }
    let filtered = [];
    for(let d=0; d<nn.c_depth; d++){
        filtered[d] = new Matrix((resized.rows - 2), (resized.cols - 2));
        for(let i=1; i<(resized.rows - 1); i++){
            for(let j=1; j<(resized.cols - 1); j++){
                filtered[d].data[i - 1][j - 1] = convolutionPixel(resized, i, j, nnfilters[d]);
            }
        }
    }
    return filtered;
}

// =========================================================================================================

function d_convolutionPixel(img, x, y, filter){
    let sum = 0;

    for(let i=0; i<28; i++){
        for(let j=0; j<28; j++){
            let factor = filter.data[i][j];
            sum += img.data[(x*13) + i][(y*13) + j] * factor;
        }
    }
    return sum;
}

function d_convolution(img, error_values){                                   // Apenas 1 imagem e Filtros 28x28x'nn.c_depth'
    let resized = new Matrix((img.rows + 26),(img.cols + 26));
    for(let i=13; i<(resized.rows - 13); i++){
        for(let j=13; j<(resized.cols - 13); j++){
            resized.data[i][j] = img.data[i-13][j-13]
        }
    }
    let filter_gradient = [];
    for(let d=0; d<nn.c_depth; d++){
        filter_gradient[d] = new Matrix(3, 3);
        for(let i=0; i<3; i++){
            for(let j=0; j<3; j++){
                filter_gradient[d].data[i][j] = d_convolutionPixel(resized, i, j, error_values[d]);
            }
        }
    }
    return filter_gradient;
}

// =========================================================================================================



//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ CONVOLUCOES COM nn.c_depth IMGs      ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
function D3_convolutionPixel(img, x, y, filter){
    let sum = 0;

    for(let i=-1; i<=1; i++){
        for(let j=-1; j<=1; j++){
            let factor = filter.data[i+1][j+1];
            sum += img.data[x + i][y + j] * factor;
        }
    }
    return sum;
}

function D3_convolution(img, nnfilters){                                   // nn.c_depth imagens e Filtros 3x3 x 'nn.c_depth' x 'nn.c_depth'
    let resized = [];
    for(let d=0; d<nn.c_depth; d++){
        resized[d] = new Matrix((img[d].rows+2),(img[d].cols+2));
        for(let i=1; i<(resized[d].rows - 1); i++){
            for(let j=1; j<(resized[d].cols - 1); j++){
                resized[d].data[i][j] = img[d].data[i-1][j-1]
            }
        }
    }
    let filtered = [];
    for(let w=0; w<nn.c_depth; w++){
        filtered[w] = new Matrix((resized[0].rows - 2), (resized[0].cols - 2));
        for(let d=0; d<nn.c_depth; d++){
            for(let i=1; i<(resized[0].rows - 1); i++){
                for(let j=1; j<(resized[0].cols - 1); j++){
                    filtered[w].data[i - 1][j - 1] += D3_convolutionPixel(resized[d], i, j, nnfilters[w][d]);
                }
            }
        }
    }
    return filtered;
}

// =========================================================================================================

function d_D3_convolutionPixel(img, x, y, filter){
    let sum = 0;

    for(let i=0; i<28; i++){
        for(let j=0; j<28; j++){
            let factor = filter.data[i][j];
            sum += img.data[(x*13) + i][(y*13) + j] * factor;
        }
    }
    return sum;
}

function d_D3_convolution(img, error_values){                                   // nn.c_depth imagem imagens e Filtros 28x28x'nn.c_depth'
    let resized = [];
    for(let d=0; d<nn.c_depth; d++){
        resized[d] = new Matrix((img[d].rows + 26),(img[d].cols + 26));
        for(let i=13; i<(resized[d].rows - 13); i++){
            for(let j=13; j<(resized[d].cols - 13); j++){
                resized[d].data[i][j] = img[d].data[i-13][j-13]
            }
        }
    }
    let filter_gradient = [];
    for(let w=0; w<nn.c_depth; w++){
        filter_gradient[w] = [];
        for(let d=0; d<nn.c_depth; d++){
            filter_gradient[w][d] = new Matrix(3, 3);
            for(let i=0; i<3; i++){
                for(let j=0; j<3; j++){
                    filter_gradient[w][d].data[i][j] = d_D3_convolutionPixel(resized[d], i, j, error_values[w]);
                }
            }
        }
    }
    return filter_gradient;
}

// =========================================================================================================