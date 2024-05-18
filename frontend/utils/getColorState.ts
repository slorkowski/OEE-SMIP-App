
export type MachineState = "success" | "warn" | "error";



export default function getColorState(oee: number): MachineState {
  if(oee > 80) {
    return "success";
  } else if(oee > 50) {
    return "warn";
  } else {
    return "error";
  }
}
