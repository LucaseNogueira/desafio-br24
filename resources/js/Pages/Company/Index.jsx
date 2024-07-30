import { AppContainer } from "@/Components/AppContainer";
import HeaderWelcome from "@/Components/HeaderWelcome";
import { MainContainer } from "@/Components/MainContainer";
import axios from "axios";
import { useState } from "react";
import styled from "styled-components";

const links = [
    {title: 'Voltar', href:"/"}
];

const searchButtons = [
    {title: 'Novo Registro', href:route('company.create')}
];

const SearchButtonsGroup = styled.ul`
`

const LinkButton = styled.a`
    background-color: #2FC7F7;
    border-radius: 5px;
    padding: 10px 15px;
`

const DangerButton = styled.button`
    background-color: #f44336;
    border-radius: 5px;
    padding: 8px 15px;
    margin: ${props => props.clearance || 'initial'}
`

const SearchTable = styled.table`
    width: 100%;
    margin: 20px auto;
    border-collapse: collapse;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
`

const TableHead = styled.thead`
    text-transform: uppercase;
    font-weight: bold;
    border-bottom: 2px solid black;
`

const TableColumn = styled.td`
    padding: 12px 15px;
    text-align: left;
    font-weight: ${props => props.fontWeight || 'normal'}
`

const TableHeaderColumn = styled(TableColumn).attrs({as: 'th'})`
    font-weight: bold;
`

const TableRow = styled.tr`
    border-bottom: 1px solid #dddddd;
`

export default function Index({companies}){
    const [companyList, setCompanyList] = useState(companies);
    companies = null;

    function companyDelete(id){
        if(window.confirm('Você deseja excluir esta empresa e seus contatos do sistema?')){
            axios.delete(route('company.destroy', id))
                .then(response => {
                    alert(response.data.message);
                    setCompanyList(response.data.companies);
                })
                .catch(error => {
                    alert('Ocorreu um erro durante a execução da tarefa. Se persistir o problema, contate o suporte.');
                })
        }
    }

    return (
        <AppContainer>
            <HeaderWelcome links={links} linkColor="#2FC7F7"/>
            <MainContainer>
                <SearchButtonsGroup>
                    { searchButtons.map((searchButton) => (
                        <li><LinkButton href={searchButton.href}>{searchButton.title}</LinkButton></li>
                    ))}
                </SearchButtonsGroup>
                <SearchTable>
                    <TableHead>
                        <tr>
                            <TableHeaderColumn>#</TableHeaderColumn>
                            <TableHeaderColumn>Company Title</TableHeaderColumn>
                            <TableHeaderColumn>Contact Name</TableHeaderColumn>
                            <TableHeaderColumn>Actions</TableHeaderColumn>
                        </tr>
                    </TableHead>
                    <tbody>
                        {companyList.map((company, index) => (
                            <TableRow key={company.id}>
                                <TableColumn fontWeight="bold">{index + 1}</TableColumn>
                                <TableColumn>{company.title}</TableColumn>
                                <TableColumn>
                                    <ul>
                                        {company.contact.map(con => (
                                            <li key={con.id}>{con.name + ' ' + con.last_name}</li>
                                        ))}
                                    </ul>
                                </TableColumn>
                                <TableColumn>
                                    <LinkButton href={route('company.edit', company.id)}>Editar</LinkButton>
                                    <DangerButton onClick={() => companyDelete(company.id)} clearance="auto 5px">Excluir</DangerButton>
                                </TableColumn>
                            </TableRow>
                        ))}
                    </tbody>
                </SearchTable>
            </MainContainer>
        </AppContainer>
    );
}
