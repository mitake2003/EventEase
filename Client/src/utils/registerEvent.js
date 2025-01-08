import axios from "axios";
import { toast } from "react-toastify";

const handleEventRegister = async () => {
    const userId = sessionStorage.getItem("id");
    const eventId = sessionStorage.getItem("eventId")
    if (!userId) {
      toast("Login to register")
    }
    else {
      await axios.put("/api/v1/events/eventRegister",
        {
            eventId,
            userId,
        })
        .then(res => {
          console.log(res.data);
          toast("registered successfully");
        })
        .catch(err => toast("Already registered !"))
    };
}

export default handleEventRegister;