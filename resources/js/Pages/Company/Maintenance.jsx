import { AppContainer } from "@/Components/AppContainer";
import { HeaderContainer } from "@/Components/HeaderContainer";
import { MainContainer } from "@/Components/MainContainer";
import OptionsHeader from "@/Components/OptionsHeader";
import { router } from "@inertiajs/react";
import { useState } from "react";
import styled from "styled-components";

const FormFieldGroup = styled.div`

`

const FieldContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin-bottom: 25px;
`

const Label = styled.label`
    margin-bottom: 10px;
    font-size: 14px;
    color: #495057;
    display:block;
`

const Input = styled.input`
    width: 100%;
    padding: 0.5rem;
    font-size: 16px;
    color: #495057;
    border: 1px solid #ced4da;
    box-sizing: border-box;
    border-radius: 5px;
    transition: border-color 0.2s ease, box-shadow 0.2s ease;

    &:focus{
        border-color: #80bdff;
        outline: none;
        box-shadow: 0 0 0 0.2rem rgba(38, 143, 255, 0.25);
    }
`

const Fieldset = styled.fieldset`
    border-collapse: collapse;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
`

const FieldsetCard = styled.div`
    margin: 10px;
    padding: 5px;
`

const ButtonFieldset = styled.button`
    padding: ${props => props.spacing || "5px 10px"};
    background-color: ${props => props.backgroundColor || "#007bff"};
    border: none;
    border-radius: 4px;
    cursor: pointer;
    color: #fff;
    margin-top: 10px;
`

const links = [
    {title:"Voltar", href:route('company.index')}
];

export default function Maintenance({action, method, company}){
    const contacts = company ? company.contact : null;
    if(contacts){
        const neededContacts = 2 - contacts.length;

        for(let i = 0; i < neededContacts; i++){
            contacts.push({...{name:"", last_name:""}});
        }
    }

    const [values, setValues] = useState({
        company_name: company ? company.title : "",
        company_email: company ? company.email : "",
        contact_name_1: contacts ? contacts[0].name : "",
        contact_last_name_1: contacts ? contacts[0].last_name : "",
        contact_name_2: contacts ? contacts[1].name : "",
        contact_last_name_2: contacts ? contacts[1].last_name : ""
    })

    function handleSubmit(e){
        e.preventDefault();
        router[method](action, values);
    }

    function handleChange(e){
        const key = e.target.id;
        const value = e.target.value;
        setValues(values => ({
            ...values,
            [key]: value,
        }))
    }

    return (
        <AppContainer>
            <HeaderContainer>
                <OptionsHeader links={links} linkColor="#2FC7F7"/>
            </HeaderContainer>
            <MainContainer>
                <form onSubmit={handleSubmit}>
                    <FormFieldGroup>
                        <FieldContainer>
                            <Label for="company_name">Nome da Empresa</Label>
                            <Input type="text" id="company_name" name="company_name" placeholder="Digite o nome da empresa" required value={values.company_name} onChange={handleChange}/>
                        </FieldContainer>
                        <FieldContainer>
                            <Label for="company_email">Email da Empresa</Label>
                            <Input type="email" id="company_email" name="company_email" placeholder="Digite o email da empresa" required value={values.company_email} onChange={handleChange}/>
                        </FieldContainer>
                    </FormFieldGroup>
                    <Fieldset>
                        <legend>Contato</legend>
                            <FieldsetCard>
                                <FieldContainer>
                                    <Label for="contact_name_1">Nome do 1° Contato</Label>
                                    <Input type="text" id="contact_name_1" name="contact_name_1" placeholder="Digite o nome do contato" required value={values.contact_name_1} onChange={handleChange}/>
                                </FieldContainer>
                                <FieldContainer>
                                    <Label for="contact_last_name_1">Sobrenome do 1° Contato</Label>
                                    <Input type="text" id="contact_last_name_1" name="contact_last_name_1" placeholder="Digite o sobrenome do contato" required value={values.contact_last_name_1} onChange={handleChange}/>
                                </FieldContainer>
                            </FieldsetCard>
                            <FieldsetCard>
                                <FieldContainer>
                                    <Label for="contact_name_2">Nome do 2° Contato</Label>
                                    <Input type="text" id="contact_name_2" name="contact_name_2" placeholder="Digite o nome do contato" value={values.contact_name_2} onChange={handleChange}/>
                                </FieldContainer>
                                <FieldContainer>
                                    <Label for="contact_last_name_2">Sobrenome do 2° Contato</Label>
                                    <Input type="text" id="contact_last_name_2" name="contact_last_name_2" placeholder="Digite o sobrenome do contato" value={values.contact_last_name_2} onChange={handleChange}/>
                                </FieldContainer>
                            </FieldsetCard>
                    </Fieldset>
                    <ButtonFieldset type="submit">Submit</ButtonFieldset>
                </form>
            </MainContainer>
        </AppContainer>
    );
}
