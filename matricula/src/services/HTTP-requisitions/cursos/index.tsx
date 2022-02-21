import React, { useEffect } from "react";
import api from '../../api';
import { useCourse } from "../../../contexts/curso";


const {stateCourse, dispatch} = useCourse();