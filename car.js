class Car{
  #brand;
  #model;
  
  constructor(first,second) {
    this.#brand = first;
    this.#model = second;
  }

  speed = 0;
  
  go(){
    if (!this.isTrunkOpen) {
      this.speed+=5;
    }
    else{
      this.speed=this.speed;
    }
    
   
  }
  brake(){
    this.speed-=5
  }
  isTrunkOpen;
  
  openTrunk(){
    if (this.speed<=0) {
      this.isTrunkOpen=true;
    }
    else{
      this.isTrunkOpen=false;
    }
  }
  closeTrunk(){
    this.isTrunkOpen=false;
  }
  
  
  displayInfo() {
  console.log(`${this.#brand} ${this.#model} ${this.speed}km/hr ${this.isTrunkOpen}`)
}
  
}

class RaceCar extends Car{
  
  accleration;
  
  constructor(first,second,acc){
    super(first,second)
    this.accleration=acc;
  }
 
  go() {
    this.speed+=accleration;
  }
  openTrunk(){
    return ''
  }
  closeTrunk(){
    return ''
  }
  
}


const car1 = new Car('Toyota','corolla');
const car2 = new Car('Tesla','m9del3');

console.log(car1,car2)

car1.go()
car1.go()
car1.openTrunk()

car1.displayInfo()
car2.displayInfo()

const raceCar1 = new RaceCar('Mclaren','F1',25);

console.log(raceCar1)