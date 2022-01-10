import Avatar from "@material-ui/core/Avatar";
import React from "react";
import { ButtonsContainer, NameProfile, SmallProfile, WorkProfile } from "./style";
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { ProfileIn } from "../../../../utils/utilities";

const Profile: React.FC<ProfileIn> = ({ nome, cargo, foto }) => {
    const useStyles = makeStyles((theme: Theme) =>
        createStyles({
            root: {
                display: 'flex',
                '& > *': {
                    margin: theme.spacing(1),
                },
            },
            small: {
                width: theme.spacing(3),
                height: theme.spacing(3),
            },
            large: {
                width: theme.spacing(9),
                height: theme.spacing(9),
            },
        }),
    );
    const classes = useStyles();


    return (
        <SmallProfile className="row">
            <div className="col-7">
                <NameProfile>{nome}</NameProfile>
                <WorkProfile>{cargo}</WorkProfile>
            </div>
            <div className="col-5">
                <Avatar className={classes.large}>{foto}</Avatar>
            </div>
            <ButtonsContainer className="row">
                <div className="col-6 ">
                    <a href="#">ADICIONAR FOTO</a>
                </div>
                <div className="col-6">
                    <a href="#">REMOVER FOTO</a>
                </div>
            </ButtonsContainer>
        </SmallProfile>
    );
}
export default Profile;