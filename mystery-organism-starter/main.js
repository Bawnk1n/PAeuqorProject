// Returns a random DNA base
const returnRandBase = () => {
  const dnaBases = ['A', 'T', 'C', 'G'];
  return dnaBases[Math.floor(Math.random() * 4)];
};

// Returns a random single stand of DNA containing 15 bases
const mockUpStrand = () => {
  const newStrand = [];
  for (let i = 0; i < 15; i++) {
    newStrand.push(returnRandBase());
  }
  return newStrand;
};

// Factory Function to create more Aeuqor objects
const pAeuqorFactory = (specimenNum, dnaArray) => {
  return  {
    specimenNum: specimenNum,
    dna: dnaArray,
    mutate() {   //change one random DNA base in the strand
      let randomBase = 0;
      let originalBase = '';
      randomBase = Math.floor(Math.random() * this.dna.length -1)
      originalBase = this.dna[randomBase]

      switch (originalBase) {
        case 'A':
          const differentDna1 = ['T', 'C', 'G']
          this.dna[randomBase] = differentDna1[Math.floor(Math.random() * 3)];
          break;
        case 'T':
          const differentDna2 = ['A', 'C', 'G']
          this.dna[randomBase] = differentDna2[Math.floor(Math.random() * 3)];  
          break;
        case 'C':
          const differentDna3 = ['A', 'T', 'G']
          this.dna[randomBase] = differentDna3[Math.floor(Math.random() * 3)];  
          break; 
        case 'G':  
          const differentDna4 = ['A', 'T', 'C']
          this.dna[randomBase] = differentDna4[Math.floor(Math.random() * 3)];  
          break;                  
      }
      
      return this.dna;

      //  console.log(randomBase)
      //  console.log(originalBase)
      //  console.log(this.dna)

    },

    compareDNA(otherPAeuqor) {  // return the pecentage DNA bases in common between 2 strands
      let dnaInCommon = 0;
      for (let i = 0 ; i < this.dna.length ; i++) {
        
          if (otherPAeuqor.dna[i] === this.dna[i]) {
            dnaInCommon++;
            
          }
        
      }

      const percentage = (dnaInCommon/15) * 100;

      // tests -->
      // console.log(dnaInCommon)
      // console.log(percentage)
      // console.log(this.dna)
      // console.log(otherPAeuqor.dna)

      //console.log(`Specimen number ${this.specimenNum} and specimen number ${otherPAeuqor.specimenNum} have ${percentage}% DNA in common`)
      return percentage;
    },
    
    willLikelySurvive() {  //check if C or G base makes up at least 60% of the genome
      let amountOfC = 0;
      let amountOfG = 0;

      for (let i = 0; i < this.dna.length; i++) {
        if (this.dna[i] === 'C') {
          amountOfC++;
        }
        else if (this.dna[i] === 'G') {
          amountOfG++;
        }
      }
      if ((amountOfC/15) * 100 > 60){
        return true;
      }
      else if ((amountOfG/15) * 100 > 60) {
        return true;
      }
      else {
        return false;
      }
    },
    
    complementStrand() {   //Create a strand which mirrors the original strand, A's & T's mirrored, G's and C's mirrored
      let complementaryStrand = mockUpStrand();
      for (let i = 0 ; i<this.dna.length ; i++) {
        if (this.dna[i] === 'A'){
          complementaryStrand[i] = 'T';
        }
        if (this.dna[i] === 'T'){
          complementaryStrand[i] = 'A';
        }        
        else if (this.dna[i] === 'C') {
          complementaryStrand[i] = 'G';
        }
        else if (this.dna[i] === 'G') {
          complementaryStrand[i] = 'C';
        }
      }
      console.log(this.dna)
      return complementaryStrand;
    }
  }
}


const createThirtyObjects = () => { //Create a new array of 30 strands that all pass the willLikelySurvive function
const pAeuqorArray = [];
let count = 0;
while (pAeuqorArray.length < 30 && count < 100000) {

    const potentialStrand = pAeuqorFactory(count, mockUpStrand());

    if (potentialStrand.willLikelySurvive()) {
      pAeuqorArray.push(potentialStrand)
    }
    count++;
    
  }
  for (let i = 0 ; i < pAeuqorArray.length ; i++) {
    pAeuqorArray[i].specimenNum = i;
  }
  return pAeuqorArray;
}

const checkForMostCommon = () => { // creates a new array of strands that all pass the willLikelySurvive() function and tells you the two that are the most common
  const newArrayOfThirty = createThirtyObjects();
  let highestCommonality = 0;
  let firstGenome = [];
  let secondGenome = [];
  for (let i = 0 ; i < newArrayOfThirty.length ; i++) {
    for (let j = 1 ; j < newArrayOfThirty.length ; j++) {
      if (newArrayOfThirty[i].compareDNA(newArrayOfThirty[j]) > highestCommonality && newArrayOfThirty[i] != newArrayOfThirty[j]){
        highestCommonality = newArrayOfThirty[i].compareDNA(newArrayOfThirty[j]);
        firstGenome = newArrayOfThirty[i];
        secondGenome = newArrayOfThirty[j]
      }
    }
  }
  console.log(highestCommonality)
  console.log(firstGenome)
  console.log(secondGenome)
  console.log(`The highest percentage commonality is ${highestCommonality} and it is between specimen # ${firstGenome.specimenNum} and ${secondGenome.specimenNum}`)
  //return highestCommonality, firstGenome, secondGenome;
  
  
}



// tests

//obj.mutate()
//obj.compareDNA(pAeuqorFactory(2, mockUpStrand()))
//console.log(obj.willLikelySurvive())
//createThirtyObjects()
//console.log(pAeuqorArray)
//console.log(pAeuqorFactory(1, mockUpStrand()).complementStrand())
console.log(checkForMostCommon());
