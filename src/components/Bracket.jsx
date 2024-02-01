import React, { useState, useEffect } from "react";
import Cards from "./Cards";
import "../CSS/Bracket.css";
import axios from "axios";

const DEFAULT_QUANTITY = 8;
const BRACKET_PIXELS_WIDTH = 1500;
const BRACKET_PIXELS_HEIGHT = 1000;

export default function Bracket({
  doNotSeed,
  manualContenders,
  contenderQuantity,
}) {
  const [tree, setTree] = useState(
    manualContenders && manualContenders.length > 0
      ? makeTree(doNotSeed ? shuffleArray(manualContenders) : manualContenders)
      : null
  );

  // const [r1Winners, setR1Winners] = useState([]);
  // const [r2Winners, setR2Winners] = useState([]);
  // const [winner, setWinner] = useState([]);
  // const [rests, setRests] = useState([]);
  // const [round, setRound] = useState(1);

  // make a useEffect, inside watch r1 winners and r2 winners
  // if there's a change, fire a function that checks the length of the sets(winners)
  // if r1.length is 4, we need to update the round by one
  //  if r2 length is 2, update round to be round 3

  useEffect(() => {
    if (!manualContenders) {
      const successCallback = (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        console.log(position.coords.latitude);
        console.log(position.coords.longitude);

        axios
          .get(`/restaurants/${latitude}/${longitude}`)
          .then((res) => {
            console.log('hey')
            // setRests(res.data.restInfo);
            let quantity = contenderQuantity;
            if (!quantity) {
              quantity = DEFAULT_QUANTITY;
            }
      
            setTree(makeTree(doNotSeed ? shuffleArray(res.data.restInfo) : res.data.restInfo));
            
            
          })
          .catch((err) => console.log(err));
        };
        
        const errorCallback = (error) => {
          console.log(error);
      };

      navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
    }

  }, []);

  function selectNode (node){
    if(!node.active || !node.parent){
      return
    }

    let siblingNode = node.parent.child1
    if (siblingNode === node){
      siblingNode = node.parent.child2
    }

    if(!siblingNode || !siblingNode.active){
      return
    }

    node.parent.active = true
    node.parent.value = node.value

    siblingNode.active = false

    node.active = false

    setTree(structuredClone(tree))
  }



  // const eachRest = rests.map((rest) => {
  //   return (
  //     <Cards
  //       rest={rest}
  //       rests={rests}
  //       setR1Winners={setR1Winners}
  //       setR2Winners={setR2Winners}
  //       setWinner={setWinner}
  //       round={round}
  //       setRound={setRound}
  //     />
  //   )
  // });

  // console.log(r1Winners);
  return (
    <>
      <h1>Munch Madness!</h1>
      {/* <br />
      {eachRest[0]}
      {eachRest[1]}
      <br />
      {eachRest[2]}
      {eachRest[3]}
      <br />
      {eachRest[4]}
      {eachRest[5]}
      <br />
      {eachRest[6]}
      {eachRest[7]} */}
      {
        tree
          ?<div
          style={{position: 'relative', width: BRACKET_PIXELS_WIDTH, height: BRACKET_PIXELS_HEIGHT}}
      >
          {
              createTreeArrs(tree).map((levelArr, n, treeArr) => {
                  let x = BRACKET_PIXELS_WIDTH * (n / treeArr.length)
                  return <div
                      className={"node-level"}
                      style={{
                          height: '100%',
                          position: 'absolute',
                          top: 0,
                          left: `${x}px`,
                          // display: 'flex',
                          display: 'grid',
                          gridTemplateColumns: ``,
                          flexDirection: 'column',
                          justifyContent: 'space-around',
                          alignItems: 'center'}}
                  >
                      {
                          levelArr.map((node) => {
                              return <div
                                  onClick={() => selectNode(node)}
                                  className={(node.active ? "active-node-box " : "inactive-node-box ") + "node-box"}
                              >
                                  <h4>{node?.value?.name}</h4>
                              </div>
                          })
                      }
                  </div>
              })
          }
      </div>
          : <div>No bracket</div>
      }

    </>
  );
}

function createTreeArrs(tree) {
  if (!tree || tree.length === 0) {
    return [];
  }

  let returnArr = [];
  let collectionArr = [tree];

  while (collectionArr.length) {
    let node = collectionArr.shift();

    if (!returnArr[node.depth - 1]) {
      returnArr.push([]);
    }

    returnArr[node.depth - 1].push(node);

    if (node.child1) {
      collectionArr.push(node.child1);
    }

    if (node.child2) {
      collectionArr.push(node.child2);
    }
  }

  console.log(returnArr);
  return returnArr;
}

function makeTree(arr, depth = 1) {
  if (!arr?.length) {
    return null;
  }

  let thisNode = {
    depth,
  };

  //if there is just a single value, then make a node for it
  if (arr.length === 1) {
    //make that node's value the string
    thisNode.value = arr[0];
    //it has no children
    thisNode.child1 = null;
    thisNode.child2 = null;
    thisNode.active = true;
    //return that node
    return thisNode;
  }

  //if there is more than one value
  //split the values into two seperate arrays
  //the rules by which I decide which values go into which array are...
  //...tricky to explain in english. It might just be easier to decipher
  //the if/else code below
  let arr1 = [];
  let arr2 = [];
  if (arr.length === 3) {
    arr1.push(arr[0]);
    arr2.push(arr[1], arr[2]);
  } else if (arr.length === 2) {
    arr1.push(arr[0]);
    arr2.push(arr[1]);
  } else {
    //gets the closest power of 2 number that is equal to
    //or less than the number of array elements
    let nearestBase2 = 1 << (31 - Math.clz32(arr.length));

    for (let i = 0; i < arr.length; i++) {
      let x = i;
      if (i >= nearestBase2) {
        x = nearestBase2 * 2 - i - 1;
      }

      if (x < nearestBase2 / 2 && x % 2 === 0) {
        arr1.push(arr[i]);
      } else if (x < nearestBase2 / 2 && x % 2 === 1) {
        arr2.push(arr[i]);
      } else if (x >= nearestBase2 / 2 && x < nearestBase2 && x % 2 === 1) {
        arr1.push(arr[i]);
      } else if (x >= nearestBase2 / 2 && x < nearestBase2 && x % 2 === 0) {
        arr2.push(arr[i]);
      }
    }
  }

  //call the function recursively, two times with both arrays
  //save the returns of those two recursive calls to two seperate variables
  let childNode1 = makeTree(arr1, depth + 1);
  let childNode2 = makeTree(arr2, depth + 1);

  //make a node object (already done at the top of the function)
  //child 1 property will be the result of the first recursive call
  thisNode.child1 = childNode1;
  //child 2 property will be the result of the second recursive call
  thisNode.child2 = childNode2;
  //it's value property is null for now
  thisNode.value = null;
  //it won't be active initially
  thisNode.active = false;

  //extra stuff to give the children parents
  childNode1.parent = thisNode;
  childNode2.parent = thisNode;
  thisNode.parent = null;

  //return that node
  return thisNode;
}

//this function simply randomizes the order of values in an array
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}


