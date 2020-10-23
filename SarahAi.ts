function main(gameState, side) {
    const myTeam = gameState.teamStates[side];

    let colSize = 5;
    let rowSize = 5;

    let board = gameState.tileStates

    const enemyTeam = gameState.teamStates[getOtherTeam(side)];
    let nearest = nearestEnemy(myTeam, enemyTeam);

    let firstPlayerMoves = getDirectionToEnemy(myTeam[0].coord, enemyTeam[nearest].coord, board);
    let secondPlayerMoves = getDirectionToEnemy(myTeam[1].coord, enemyTeam[nearest].coord, board);
    let finalPlayerMoves = getProtectPlayerMove(myTeam[2].coord, board);

    let playerOne =firstPlayerMoves[Math.floor(Math.random() * firstPlayerMoves.length)] ;
    let playerTwo =secondPlayerMoves[Math.floor(Math.random() * secondPlayerMoves.length)] ;
    return [playerOne, playerTwo, finalPlayerMoves[Math.floor(Math.random() * finalPlayerMoves.length)]];
  }

function nearestEnemy(myTeam, enemyTeam){
  let swarm1 = myTeam[0].coord;
  let swarm2 = myTeam[1].coord;
  let min = 100;
  let index = 0; 
  for (let i = 0; i < enemyTeam.length; i++) {
    let enemyCoord = enemyTeam[i].coord;

    let distance = distanceBetweenCoord(swarm1, enemyCoord) + distanceBetweenCoord(swarm2, enemyCoord);

    if (min > distance){
      min = distance;
      index = i;
    }
  }
  return index;
}

function getProtectPlayerMove(coordMe, board){
  let moves=[];

  let col = coordMe[1];
  let row = coordMe[0];
  const canNorth = row > 0;
  const canSouth = row < 5 - 1;
  const canWest = col > 0;
  const canEast = col < 5 - 1;
  const northExist = board[row - 1 >= 0 ? row - 1 : 0][col] > 1;
  const southExist = board[row + 1 <= 4 ? row + 1 : 4][col] > 1;
  const westExist  = board[row][col - 1 >= 0 ? col - 1 : 0] > 1;
  const eastExist  = board[row][col + 1 <= 4 ? col + 1 : 4] > 1;

  if(board[row][col]>1){
    moves.push("none");
    moves.push("none");
    moves.push("none");
    moves.push("none");
    moves.push("none");
    moves.push("none");
    moves.push("none");
    moves.push("none");
  }
  if (canEast && eastExist){
    moves.push("east");
    moves.push("east");
    moves.push("east");
    moves.push("east");
  }
  if (canWest && westExist){
    moves.push("west");
    moves.push("west");
    moves.push("west");
    moves.push("west");
  }
  if (canSouth && southExist){
    moves.push("south");
  }
  if (canNorth && northExist){
    moves.push("north");
    moves.push("north");
    moves.push("north");
    moves.push("north");
    moves.push("north");
    moves.push("north");
  }

  return moves;
}

function getDirectionToEnemy(coordMe, coordEnemy, board){
  let moves=[];

  let col = coordMe[1];
  let row = coordMe[0];
  const canNorth = row > 0;
  const canSouth = row < 5 - 1;
  const canWest = col > 0;
  const canEast = col < 5 - 1;
  const northExist = board[row - 1 >= 0 ? row - 1 : 0][col] > 1;
  const southExist = board[row + 1 <= 4 ? row + 1 : 4][col] > 1;
  const westExist  = board[row][col - 1 >= 0 ? col - 1 : 0] > 1;
  const eastExist  = board[row][col + 1 <= 4 ? col + 1 : 4] > 1;
  if (coordMe[1]<coordEnemy[1] && canEast && eastExist){
    moves.push("east");
  }
  else if(coordMe[1]>coordEnemy[1] && canWest && westExist){
    moves.push("west");
  }
  if (coordMe[0]<coordEnemy[0] && canSouth && southExist){
    moves.push("south");
  }
  else if(coordMe[0]>coordEnemy[0] && canNorth && northExist){
    moves.push("north");
  }
  return moves;
}

function distanceBetweenCoord(coord1, coord2){
  let x = Math.abs(coord1[0] - coord2[0]);
  let y = Math.abs(coord1[1] - coord2[1]);

  return Math.sqrt((x*x)+(y*y));
}

function getOtherTeam(side){
  if (side === "away"){
    return "home";
  }
  return "away";
  }