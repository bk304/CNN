var gpu = new GPU();

class Matrix {
    constructor(rows, cols) {
        this.rows = rows;
        this.cols = cols;

        this.data = [];

        for (let i = 0; i < rows; i++) {
            let arr = []
            for (let j = 0; j < cols; j++) {
                arr.push(0)
            }
            this.data.push(arr);
        }
    }

    // Funções Diversas

    static arrayToMatrix(arr) {
        let m = new Matrix(arr.length, 1);
        for (let i = 0; i < arr.length; i++) {
          m.data[i][0] = arr[i];
        }
        return m;
      }


    static MatrixToArray(obj) {
        let arr = [];
        for (let i = 0; i < obj.rows; i++) {
          for (let j = 0; j < obj.cols; j++) {
            arr.push(obj.data[i][j]);
          }
        }
        return arr;
      }


    print() {
        console.table(this.data);
    }

    randomize() {
        this.map((elm, i, j) => {
            return Math.random() * 2 - 1;
        });
    }

    map(func) {

        this.data = this.data.map((arr, i) => {
            return arr.map((num, j) => {
                return func(num, i, j);
            })
        })

        return this;
    }
    
    static map(matrix, func) {
        let result = new Matrix(matrix.rows, matrix.cols);
        // Apply a function to every element of matrix
        for (let i = 0; i < matrix.rows; i++) {
          for (let j = 0; j < matrix.cols; j++) {
            let val = matrix.data[i][j];
            result.data[i][j] = func(val);
          }
        }
        return result;
    }

    static transpose(A){
        let matrix = new Matrix(A.cols, A.rows);
        matrix.map((num,i,j) => {
            return A.data[j][i];
        });
        return matrix;
    }

    static inverse(A){
        let matrix = new Matrix(A.cols, A.rows);
        for (let i = 0; i < matrix.rows; i++) {
            for (let j = 0; j < matrix.cols; j++) {
                matrix.data[i][j] = A.data[matrix.rows-i-1][matrix.cols-j-1];
            }
        }

        return matrix;
    }

    // Operações Estáticas Matriz x Escalar 
    
    static escalar_multiply(A, escalar) {
        let matrix = new Matrix(A.rows, A.cols);

        matrix.map((num, i, j) => {
            return A.data[i][j] * escalar;
        });

        return matrix;
    }
    
    // Operações Estáticas Matriz x Matriz

    static hadamard(A, B) {
        let matrix = new Matrix(A.rows, A.cols);

        matrix.map((num, i, j) => {
            return A.data[i][j] * B.data[i][j]
        });

        return matrix;
    }

    static add(A, B) {
        let matrix = new Matrix(A.rows, A.cols);

        matrix.map((num, i, j) => {
            return A.data[i][j] + B.data[i][j]
        });

        return matrix;
    }

    static subtract(A, B) {
        let matrix = new Matrix(A.rows, A.cols);

        matrix.map((num, i, j) => {
            return A.data[i][j] - B.data[i][j]
        });

        return matrix;
    }

    static multiply(A, B) {
        let matrix = new Matrix(A.rows, B.cols);

        matrix.map((num, i, j) => {
            let sum = 0
            for (let k = 0; k < A.cols; k++) {
                let elm1 = A.data[i][k];
                let elm2 = B.data[k][j];
                sum += elm1 * elm2;
            }
            
            return sum;
        })
        return matrix;
    }
}