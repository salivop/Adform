import React from "react";
import Paper from "@material-ui/core/Paper";

import { styles } from "./PaperWrapper.styles";

const PaperWrapper = ({ form }) => <Paper style={styles.paper}>{form}</Paper>;

export default PaperWrapper;
