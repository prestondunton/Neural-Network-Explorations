#pragma strict

var neurons : GameObject[];
var weightLines : GameObject[];
var colors : Color[];
var weights : float[];

var rate : float;

var geneticAlgorithm : boolean;
var populationSize : int;
var mutationRate : int;
var generationMax : float;
var generation : float;
var population : float[]; //population[0-11] is 1 individual
var fitnesses : float[]; 

var stepSize : float;

var inputPanelUI : GameObject;
var resetUI : UnityEngine.UI.Button;

var rSlider : UnityEngine.UI.Slider;
var gSlider : UnityEngine.UI.Slider;
var bSlider : UnityEngine.UI.Slider;
var rInputField : UnityEngine.UI.InputField;
var gInputField : UnityEngine.UI.InputField;
var bInputField : UnityEngine.UI.InputField;
var colorPreview : GameObject;
var iterationRateUI : UnityEngine.UI.InputField;
var dropDownUI : UnityEngine.UI.Dropdown;

var inputGeneticAlgorithmUI : GameObject;
var geneticAlgorithmUI : GameObject;
var populationSizeUI : UnityEngine.UI.InputField;
var generationMaxUI : UnityEngine.UI.InputField;
var mutationRateUI : UnityEngine.UI.InputField;
var graph1 : GameObject;
var graph2 : GameObject;
var generationMaxGUI : GameObject;
var halfMax : GameObject;
var increment1 : float;
var increment2 : float;
var generationGUI : GameObject;
var individualGUI : GameObject;
var fitnessGUI : GameObject;
var maxFitnessGUI : GameObject;
var maxFitness : float;

var inputGradientDescentUI : GameObject;
var gradientDescentUI : GameObject;
var stepSizeUI : UnityEngine.UI.InputField;
var descentFitnessGUI : GameObject;


function Start () {
	population = new float[populationSize * 12];
	fitnesses = new float[populationSize];
	generation = 0;
}

function SliderUpdate(){
	var result : float;
	if(float.TryParse(rInputField.text, result))
		rSlider.value = result;
	if(float.TryParse(gInputField.text, result))
		gSlider.value = result;
	if(float.TryParse(bInputField.text, result))
		bSlider.value = result;
		
	colorPreview.GetComponent.<UnityEngine.UI.Image>().color = new Color(rSlider.value / 255, gSlider.value / 255, bSlider.value / 255);
	
}

function InputFieldUpdate(){
	rInputField.text = rSlider.value.ToString();
	gInputField.text = gSlider.value.ToString();
	bInputField.text = bSlider.value.ToString();
	
	colorPreview.GetComponent.<UnityEngine.UI.Image>().color = new Color(rSlider.value / 255, gSlider.value / 255, bSlider.value / 255);
}

function BeginIteration(){
	
	if(geneticAlgorithm){
		geneticAlgorithmUI.active = true;
		gradientDescentUI.active = false;
		var result : float;
		if(float.TryParse(populationSizeUI.text, result))
			populationSize = result; 
		if(float.TryParse(generationMaxUI.text, result))
			generationMax = result;
		if(float.TryParse(mutationRateUI.text, result))
			mutationRate = result;
		if(float.TryParse(iterationRateUI.text, result))
			rate = result;
			
		neurons[0].GetComponent.<Renderer>().material.color = colorPreview.GetComponent.<UnityEngine.UI.Image>().color;
		
		generationMaxGUI.GetComponent.<GUIText>().text = generationMax.ToString();
		var half : int = generationMax / 2;
		halfMax.GetComponent.<GUIText>().text = half.ToString();
		increment1 = 100 / generationMax;
		increment2 = 100 / (generationMax * populationSize);
		graph1.transform.position = new Vector3(0, 30, 0);
		
		
		InitialPopulation();
		EvaluatePopulation();
	} else {
		geneticAlgorithmUI.active = false;
		gradientDescentUI.active = true;
		
		neurons[0].GetComponent.<Renderer>().material.color = colorPreview.GetComponent.<UnityEngine.UI.Image>().color;
		var result1 : float;
		if(float.TryParse(stepSizeUI.text, result1))
			stepSize = result1;
			
		for(var i : int = 0; i < 12; i++){
			weights[i] = 1;
		}
		GradientDescent();
	}
	
	inputPanelUI.active = false;
	resetUI.gameObject.active = true;
}

function DropDownChange(){
	if(dropDownUI.value == 0){
		geneticAlgorithm = true;
		inputGeneticAlgorithmUI.active = true;
		inputGradientDescentUI.active = false;
	} else {
		geneticAlgorithm = false;
		inputGradientDescentUI.active = true;
		inputGeneticAlgorithmUI.active = false;
	}
}

function Reset(){
	Application.LoadLevel(0);
}

function Update () {		
}

function ForwardPropogation() : float{

	colors[0] = neurons[0].GetComponent.<Renderer>().material.color;
	
	colors[1] = new Color(colors[0].r, 0, 0);
	colors[2] = new Color(0, colors[0].g, 0);
	colors[3] = new Color(0, 0, colors[0].b);
	colors[8] = new Color(1 - colors[0].r, 1 - colors[0].g, 1 - colors[0].b);

	for(var i : int = 4; i < 7; i++){
		colors[i] = new Color(sigmoid(colors[1].r * weights[i-4]), sigmoid(colors[2].g * weights[i-1]), sigmoid(colors[3].b * weights[i+2]));
	}
	
	var sumR : float = 0;
	var sumG : float = 0;
	var sumB : float = 0;
	for(var u : float = 4; u < 7; u++){
		sumR += colors[u].r * weights[u+5];
		sumG += colors[u].g * weights[u+5];
		sumB += colors[u].b * weights[u+5];
	}
	colors[7] = new Color( sigmoid(sumR / 3), sigmoid(sumG / 3), sigmoid(sumB / 3));

	Display();
	
	var fitness : float = 0;
	fitness = fitness + Mathf.Abs(colors[8].r - colors[7].r) + Mathf.Abs(colors[8].g - colors[7].g) + Mathf.Abs(colors[8].b - colors[7].b);
	if(Mathf.Round(colors[8].r * 255) == Mathf.Round(colors[7].r * 255) &&
	   Mathf.Round(colors[8].g * 255) == Mathf.Round(colors[7].g * 255) &&
	   Mathf.Round(colors[8].b * 255) == Mathf.Round(colors[7].b * 255)){
	   	return 0;
	   }
	return fitness;
}

function Display(){
	for(var i : int = 1; i < 9; i++){
		neurons[i].GetComponent.<Renderer>().material.color = colors[i];
	}
	for(var o : int = 0; o < 12; o++){
		weightLines[o].GetComponent(LineRenderer).SetWidth(weights[o] / 10, weights[o] / 10);
	}
	
}

function sigmoid(x : float){
	x *= 10.0;
	x -= 5.0;

	var etothex : float = Mathf.Exp(x);
	var plusone : float = etothex + 1;
	return etothex / plusone;
}

function InitialPopulation(){
	for(var i : int = 0; i < populationSize * 12; i++){
		var rand : float = Random.Range(0, 11);
		if(rand < 5)
			population[i] = Random.Range(0, 1.0001);
		if(rand >= 5) 
			population[i] = Random.Range(1, 9.35);
	}
}

function EvaluatePopulation(){
	generationGUI.GetComponent.<GUIText>().text = "Generation: " + generation;
	for(var i : int = 0; i < populationSize; i++){
		for(var o : int = 0; o < 12; o++){
			var u : int = i * 12;
			weights[o] = population[u+o]; 
		}
		fitnesses[i] = ForwardPropogation();
		
		if(FitnessToPercent(fitnesses[i]) > maxFitness)
		maxFitness = FitnessToPercent(fitnesses[i]);
		
		graph2.transform.position = new Vector3((increment1 * generation) + (i * increment2), 30 + FitnessToPercent(fitnesses[i]), 1);
		individualGUI.GetComponent.<GUIText>().text = "Individual: " + i;
		fitnessGUI.GetComponent.<GUIText>().text = "Fitness: " + FitnessToPercent(fitnesses[i]) + "%";
		maxFitnessGUI.GetComponent.<GUIText>().text = "Max Fitness: " + maxFitness + "%";
		
		yield new WaitForSeconds(rate);
	}	
	graph1.transform.position = new Vector3(increment1 * (generation + 1), 30 + FitnessToPercent(AverageFitness(fitnesses)), 0);
	
	NewGeneration();
}

function NewGeneration(){
	var newPopulation : float[] = SortPopulation(population);
	
	newPopulation = KillOff(newPopulation);
	newPopulation = Breeding(newPopulation);
	newPopulation = Mutate(newPopulation);
	generation += 1;
	
	System.Array.Copy(newPopulation, population, populationSize * 12);
	if(generation < generationMax)
	EvaluatePopulation();
}

function SortPopulation(oldPopulation : float[]) : float[]{
	var fitnessOrder : float[] = new float[populationSize];
	var populationOrder : float[] = new float[populationSize * 12];
	System.Array.Copy(fitnesses, fitnessOrder, populationSize);
	System.Array.Sort(fitnessOrder);
	
	for(var i : int = 0; i < populationSize; i++){
		for( var o : int = 0; o < 12; o++){
			var u : int = System.Array.IndexOf(fitnesses, fitnessOrder[i]) * 12;
			populationOrder[(12 * i) + o] = oldPopulation[u + o]; 
		}		
	}
	return populationOrder;
}

function KillOff(currentPopulation : float[]) : float[]{
	for(var i : int = 0; i <  4 * populationSize; i++){
		var length : int = populationSize * 12;
		length -= 1;
		currentPopulation[length - i] = 0;
	}
	return currentPopulation;
}

function Breeding(currentPopulation : float[]) : float[]{
	
	for(var i : int = 0; i < (2 * populationSize) / 3; i+= 2){ // i is number of parent couples
		var x : float[] = new float[4 * populationSize]; // father
		var y : float[] = new float[4 * populationSize]; // mother
		var z : float[] = new float[4 * populationSize]; // child
		for(var o : int = 0; o < 12; o++){
			var i1 : int = i + 1;
			x[o] = currentPopulation[(12 * i) + o];
			y[o] = currentPopulation[(12 * i1) + o];
		}
		z = Crossover(x, y);
		for(var a : int = 0; a < 12; a++){
			var twoThirds : int = 8 * populationSize;
			var sixi : int = 6 * i; //12 * (i / 2)
			currentPopulation[twoThirds + sixi + a] = z[a];
		}
	}
	return currentPopulation;
}

function Crossover(x : float[], y : float[]) : float[]{
	var crossoverPoint : int = Random.Range(0, 12);
	var z : float[] = new float[4 * populationSize];
	var parent : float = Random.Range(0, 2);
	
	if(parent == 0){  //father is first parent
		for(var i : int = 0; i < 12; i++){
			if(i < crossoverPoint){
				z[i] = x[i];
			}
			if(i >= crossoverPoint){
				z[i] = y[i];
			}
		}
	}
	if(parent == 1){ // mother is first parent
		for(var o : int = 0; o < 12; o++){
			if(o < crossoverPoint){
				z[o] = y[o];
			}
			if(o >= crossoverPoint){
				z[o] = x[o];
			}
		}
	}
	return z;
}

function Mutate(currentPopulation : float[]) : float[]{
	for(var i : int = 8 * populationSize; i < 12 * populationSize; i++){
		if(Random.Range(0, mutationRate) == 0){
			if(Random.Range(0, 2) == 0){
				currentPopulation[i] = Random.Range(0, 1.000001);
			} else {
				currentPopulation[i] = Random.Range(1, 9.35);
			}
		}
	}
	return currentPopulation;
}

function AverageFitness(generationFitnesses : float[]){
	var sum : float = 0;
	for(var i : int = 0; i < populationSize; i++){
		sum += generationFitnesses[i];
	}
	sum /= populationSize;
	return sum;
}

function FitnessToPercent(value : float) : float{
	value *= -100;
	value /= 3;
	value += 100;
	return value;
}

function GradientDescent(){
	ForwardPropogation();
	var r : float = colors[0].r;
	var g : float = colors[0].g;
	var b : float = colors[0].b;
	var R : float = 1 - r;
	var G : float = 1 - g;
	var B : float = 1 - b;
	
	var g0 : float = R - ar(r); 
	g0 *= -1;
	g0 /= 3;
	g0 *= sigmoidPrime(weights[9]*sigmoid(weights[0]*r));
	g0 *= weights[9]*sigmoidPrime(weights[0]*r);
	g0 *= r;
	
	var g1 : float = R - ar(r); 
	g1 *= -1;
	g1 /= 3;
	g1 *= sigmoidPrime(weights[10]*sigmoid(weights[1]*r));
	g1 *= weights[10]*sigmoidPrime(weights[1]*r);
	g1 *= r;
	
	var g2 : float = R - ar(r); 
	g2 *= -1;
	g2 /= 3;
	g2 *= sigmoidPrime(weights[11]*sigmoid(weights[2]*r));
	g2 *= weights[11]*sigmoidPrime(weights[2]*r);
	g2 *= r;
	
	var g3 : float = G - ag(g); 
	g3 *= -1;
	g3 /= 3;
	g3 *= sigmoidPrime(weights[9]*sigmoid(weights[3]*g));
	g3 *= weights[9]*sigmoidPrime(weights[3]*g);
	g3 *= g;
	
	var g4 : float = G - ag(g); 
	g4 *= -1;
	g4 /= 3;
	g4 *= sigmoidPrime(weights[10]*sigmoid(weights[4]*g));
	g4 *= weights[10]*sigmoidPrime(weights[4]*g);
	g4 *= g;
	
	var g5 : float = G - ag(g); 
	g5 *= -1;
	g5 /= 3;
	g5 *= sigmoidPrime(weights[11]*sigmoid(weights[5]*g));
	g5 *= weights[11]*sigmoidPrime(weights[5]*g);
	g5 *= g;
	
	var g6 : float = B - ab(b); 
	g6 *= -1;
	g6 /= 3;
	g6 *= sigmoidPrime(weights[9]*sigmoid(weights[6]*b));
	g6 *= weights[9]*sigmoidPrime(weights[6]*b);
	g6 *= b;
	
	var g7 : float = B - ab(b); 
	g7 *= -1;
	g7 /= 3;
	g7 *= sigmoidPrime(weights[10]*sigmoid(weights[7]*b));
	g7 *= weights[10]*sigmoidPrime(weights[7]*b);
	g7 *= b;
	
	var g8 : float = B - ab(b); 
	g8 *= -1;
	g8 /= 3;
	g8 *= sigmoidPrime(weights[11]*sigmoid(weights[8]*b));
	g8 *= weights[11]*sigmoidPrime(weights[8]*b);
	g8 *= b;
	
	var g9r : float = R - ar(r);
	g9r *= -1;
	g9r /= 3;
	g9r *= sigmoidPrime(weights[9]*sigmoid(weights[0]*r));
	g9r *= sigmoid(weights[0]*r);
	var g9g : float = G - ag(g);
	g9g *= -1;
	g9g /= 3;
	g9g *= sigmoidPrime(weights[9]*sigmoid(weights[3]*g));
	g9g *= sigmoid(weights[3]*g);
	var g9b : float = B - ab(b);
	g9b *= -1;
	g9b /= 3;
	g9b *= sigmoidPrime(weights[9]*sigmoid(weights[6]*b));
	g9b *= sigmoid(weights[6]*b);
	var g9 : float = g9r + g9g + g9b;
	
	var g10r : float = R - ar(r);
	g10r *= -1;
	g10r /= 3;
	g10r *= sigmoidPrime(weights[10]*sigmoid(weights[1]*r));
	g10r *= sigmoid(weights[1]*r);
	var g10g : float = G - ag(g);
	g10g *= -1;
	g10g /= 3;
	g10g *= sigmoidPrime(weights[10]*sigmoid(weights[4]*g));
	g10g *= sigmoid(weights[4]*g);
	var g10b : float = B - ab(b);
	g10b *= -1;
	g10b /= 3;
	g10b *= sigmoidPrime(weights[10]*sigmoid(weights[7]*b));
	g10b *= sigmoid(weights[7]*b);
	var g10 : float = g10r + g10g + g10b;
	
	var g11r : float = R - ar(r);
	g11r *= -1;
	g11r /= 3;
	g11r *= sigmoidPrime(weights[11]*sigmoid(weights[2]*r));
	g11r *= sigmoid(weights[2]*r);
	var g11g : float = G - ag(g);
	g11g *= -1;
	g11g /= 3;
	g11g *= sigmoidPrime(weights[11]*sigmoid(weights[5]*g));
	g11g *= sigmoid(weights[5]*g);
	var g11b : float = B - ab(b);
	g11b *= -1;
	g11b /= 3;
	g11b *= sigmoidPrime(weights[11]*sigmoid(weights[8]*b));
	g11b *= sigmoid(weights[8]*b);
	var g11 : float = g11r + g11g + g11b;
	
//--------------------------------------------------------------------------------	
	if(g0 < 0){
		weights[0] += stepSize;
	} else {
		weights[0] -= stepSize;
	}
	
	if(g1 < 0){
		weights[1] += stepSize;
	} else {
		weights[1] -= stepSize;
	}
	
	if(g2 < 0){
		weights[2] += stepSize;
	} else {
		weights[2] -= stepSize;
	}
	
	if(g3 < 0){
		weights[3] += stepSize;
	} else {
		weights[3] -= stepSize;
	}
	
	if(g4 < 0){
		weights[4] += stepSize;
	} else {
		weights[4] -= stepSize;
	}
	
	if(g5 < 0){
		weights[5] += stepSize;
	} else {
		weights[5] -= stepSize;
	}
	
	if(g6 < 0){
		weights[6] += stepSize;
	} else {
		weights[6] -= stepSize;
	}
	
	if(g7 < 0){
		weights[7] += stepSize;
	} else {
		weights[7] -= stepSize;
	}
	if(g8 < 0){
		weights[8] += stepSize;
	} else {
		weights[8] -= stepSize;
	}
	if(g9 < 0){
		weights[9] += stepSize;
	} else {
		weights[9] -= stepSize;
	}
	if(g10 < 0){
		weights[10] += stepSize;
	} else {
		weights[10] -= stepSize;
	}
	if(g11 < 0){
		weights[11] += stepSize;
	} else {
		weights[11] -= stepSize;
	}
	/*weights[0] -= g0;
	weights[1] -= g1;
	weights[2] -= g2;
	weights[3] -= g3;
	weights[4] -= g4;
	weights[5] -= g5;
	weights[6] -= g6;
	weights[7] -= g7;
	weights[8] -= g8;
	weights[9] -= g9;
	weights[10] -= g10;
	weights[11] -= g11;*/
	
	for(var i : int = 0; i < 12; i++){
		if(weights[i] < 0)
			weights[i] = 0;
	}
//--------------------------------------------------------------------------	
	var fitness : float = ForwardPropogation();
	if(FitnessToPercent(fitness) > maxFitness)
		maxFitness = FitnessToPercent(fitness);
		
		descentFitnessGUI.GetComponent.<GUIText>().text = "Fitness: " + FitnessToPercent(fitness) + "%";
		maxFitnessGUI.GetComponent.<GUIText>().text = "Max Fitness: " + maxFitness + "%";

//------------------------------------------------------------------------------		
	if(maxFitness != 100)
		Invoke("GradientDescent", rate);
}

function ar(x : float){
	var average : float = 0;
	average += sigmoid(weights[9]*sigmoid(weights[0] * x)); 
	average += sigmoid(weights[10]*sigmoid(weights[1] * x)); 
	average += sigmoid(weights[11]*sigmoid(weights[2] * x)); 
	average /= 3;
	return average; // 0.82164
}
function ag(x : float){
	var average : float = 0;
	average += sigmoid(weights[9]*sigmoid(weights[3] * x));
	average += sigmoid(weights[10]*sigmoid(weights[4] * x));
	average += sigmoid(weights[11]*sigmoid(weights[5] * x));
	average /= 3;
	return average;
}
function ab(x : float){
	var average : float = 0;
	average += sigmoid(weights[9]*sigmoid(weights[6] * x));
	average += sigmoid(weights[10]*sigmoid(weights[7] * x));
	average += sigmoid(weights[11]*sigmoid(weights[8] * x));
	average /= 3;
	return average;
}
function sigmoidPrime(x : float){
	var exponent : float = -10*x;
	exponent +=5;
	var eterm : float = Mathf.Exp(exponent);
	var numerator : float = 10 * eterm;
	var denominator : float = 1 + eterm;
	denominator = denominator * denominator;
	return numerator / denominator;
}
