import React from "react";
import Paper from "@material-ui/core/Paper";

import { styles } from "./PaperWrapper.styles";

const PaperWrapper = ({ child }) => <Paper style={styles.paper}>{child}</Paper>;

export default PaperWrapper;
