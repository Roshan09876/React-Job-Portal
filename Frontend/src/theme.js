import { createTheme } from "@mui/material";
import { deepPurple, purple} from "@mui/material/colors";

export const theme = createTheme({
    palette: {
        primary:{
            main: deepPurple[500]
        },
        secondary:{
            main: purple[800],
            midNightBlue: "#834bff"
        }
    }
});

