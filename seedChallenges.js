import supabase from "./config/supabase.js";

const challenges = [

{
title:"Calculus",
question:"What is the derivative of f(x)=3x^2 + 2x -5?",
options:["6x + 2","3x + 2","6x - 5","6x^2 + 2x"],
correct_index:0,
difficulty:"easy",
points:50,
theorem:"Power Rule of Differentiation",
method:"Differentiate each polynomial term separately.",
hint:"Derivative of ax^n = anx^(n-1)"
},

{
title:"Calculus",
question:"What is the derivative of sin(x)?",
options:["cos(x)","-sin(x)","-cos(x)","tan(x)"],
correct_index:0,
difficulty:"easy",
points:40,
theorem:"Derivative of Trigonometric Functions",
method:"Use standard derivative rule for sine.",
hint:"Derivative of sin(x) equals cosine."
},

{
title:"Calculus",
question:"What is the derivative of ln(x)?",
options:["1/x","x","ln(x)","0"],
correct_index:0,
difficulty:"easy",
points:40,
theorem:"Logarithmic Differentiation Rule",
method:"Derivative of natural logarithm.",
hint:"Think of rate of growth of log."
},

{
title:"Linear Algebra",
question:"What is the determinant of matrix [[1,2],[3,4]]?",
options:["-2","2","10","-10"],
correct_index:0,
difficulty:"easy",
points:50,
theorem:"Determinant of 2x2 Matrix",
method:"Use formula ad − bc.",
hint:"Multiply diagonals and subtract."
},

{
title:"Complex Numbers",
question:"What is i^2?",
options:["-1","1","i","0"],
correct_index:0,
difficulty:"easy",
points:30,
theorem:"Imaginary Unit Definition",
method:"Square of imaginary unit.",
hint:"i = sqrt(-1)"
},

{
title:"Probability",
question:"What is the probability of getting heads in a fair coin?",
options:["1/2","1","1/4","0"],
correct_index:0,
difficulty:"easy",
points:30,
theorem:"Classical Probability",
method:"Favorable outcomes divided by total outcomes.",
hint:"Two equally likely outcomes."
},

{
title:"Linear Algebra",
question:"Trace of matrix [[2,0],[0,5]]?",
options:["7","10","5","2"],
correct_index:0,
difficulty:"easy",
points:40,
theorem:"Matrix Trace Property",
method:"Add diagonal elements.",
hint:"Look at main diagonal."
},

{
title:"Calculus",
question:"Derivative of e^x?",
options:["e^x","xe^x","x","1"],
correct_index:0,
difficulty:"easy",
points:40,
theorem:"Exponential Function Derivative",
method:"Derivative equals itself.",
hint:"Unique property of e."
},

{
title:"Laplace Transform",
question:"Laplace transform of 1?",
options:["1/s","s","0","s^2"],
correct_index:0,
difficulty:"medium",
points:60,
theorem:"Laplace Transform Definition",
method:"Use basic Laplace transform table.",
hint:"Constant transforms to 1/s."
},

{
title:"Differential Equations",
question:"Order of equation d²y/dx² + dy/dx + y = 0?",
options:["2","1","3","0"],
correct_index:0,
difficulty:"medium",
points:50,
theorem:"Order of Differential Equation",
method:"Look at highest derivative.",
hint:"Second derivative present."
}

];

async function seed(){

const { error } = await supabase
.from("challenges")
.insert(challenges);

if(error){
console.error(error);
}else{
console.log("Challenges inserted successfully");
}

process.exit();

}

seed();