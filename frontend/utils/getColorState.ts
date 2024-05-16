import type { MachineState } from "~/mocks/equipment";



export default (oee: number): MachineState => {
  if(oee > 80) {
    return "success";
  } else if(oee > 50) {
    return "warn";
  } else {
    return "error";
  }
};
