import { SubstrateEvent, SubstrateBlock } from "@subql/types";

function getDayStartUnix(block: SubstrateBlock): string {
  let timestamp = block.timestamp.getTime() / 1000
  let dayIndex = Math.floor(timestamp / 3600 / 24) // get unique hour within unix history
  let dayStartUnix = dayIndex * 3600 * 24 // want the rounded effect
  return dayStartUnix.toString()
}

function get7DayStartUnix(block: SubstrateBlock): string {
  let timestamp = block.timestamp.getTime() / 1000 - 604800;
  let dayIndex = Math.floor(timestamp / 3600 / 24) // get unique hour within unix history
  let day7StartUnix = dayIndex * 3600 * 24 // want the rounded effect
  return day7StartUnix.toString()
}

// function getUnix(block: SubstrateBlock): string {
//   let timestamp = block.timestamp.getTime()
//   return timestamp.toString()
// }

function tokenSplit(tokenName: string): string[] {
  const substring = "v";
  if (tokenName.includes(substring)) {
    const words = tokenName.split(substring);
    return [words[1], tokenName, 'vToken']
  } else {
    return [tokenName, "v" + tokenName, 'token']
  }
}



export { getDayStartUnix, get7DayStartUnix, tokenSplit };