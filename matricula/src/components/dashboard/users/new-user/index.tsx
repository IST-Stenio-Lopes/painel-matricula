import React, { useState } from "react";
import TopLine from "../../../top-line";
export default function NewUser() {
    const [showExit, setShowExit] = useState<boolean>(false);

    return (
        <div>
            <TopLine name="Novo Usuário" />
        </div>
    );
}