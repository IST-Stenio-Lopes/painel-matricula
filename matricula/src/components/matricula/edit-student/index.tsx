import React, { useEffect, useMemo, useState } from "react";
import Profile from "../../dashboard/edit-profile/profile";
import { NavCompensing } from "../../home/style";
import Menu from "../../menu";
import Navbar from "../../navbar";
import TopLine from "../../top-line";
import StepOne from "./step1";
import StepTwo from "./step2";
import StepThree from "./step3";
import { Fluxo } from "./style";



export default function EditStudent() {

    const [value, setValue] = useState(1);


    return (
        <div className="container-fluid login">
            <div className="row login">
                <div className="col-2 ">
                    <NavCompensing status={false} />
                    <Menu />
                </div>
                <div className="col-10 ">
                    <Navbar />
                    <div>
                        <TopLine name="Editar Aluno" />

                        <div className="row">
                            <div className="col-3">
                                <Fluxo num={value}>
                                    <p>Dados do Curso e Pagamento</p>
                                    <p>Dados do Aluno</p>
                                    <p>Anexos</p>
                                </Fluxo>

                                <Profile nome="Fowanderlay" cargo="Estudante" foto="test" />
                            </div>

                            <div className="col-9">
                                {
                                    value === 1 ? <StepOne change={() => setValue(value + 1)} /> : value === 2 ? <StepTwo /> : value === 3 ? <StepThree /> : <p>Fail</p>

                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>


    );
}