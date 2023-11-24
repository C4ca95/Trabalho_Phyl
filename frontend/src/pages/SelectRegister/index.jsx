import React from 'react'
import { CardLogin } from '../Signin/style';
import { SelectUser } from './style';
import { Link } from 'react-router-dom/cjs/react-router-dom';


const SelectRegister = () => {
  return (
    <CardLogin>
        <div className="bg">
            <div className="boxContent">
                <div className="card">
                    <SelectUser>
                        <h1>Você é</h1>
                        <div className="sections">
                            <div className="company">
                                <h2>Empresa</h2>
                                <Link to={'/signup-company'} className="border">
                                    <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAABQCAYAAACOEfKtAAAACXBIWXMAAAsTAAALEwEAmpwYAAABwUlEQVR4nO2bWW6EMBBE+1pJzpDlIFnumFHOktyiIhIijQg2BgRdBfX+EN34qcYe/IEjjDHGGGOMMTlAlGABogQLYBNS8QXrL6riDRYRVW9kC6j7A/jqHW5DDAB3vftnpsTr2FIA8AHgQnx9zXNkAuBxJMALgHfi6z/ugwFk/5eo+4JNSM0XbEJqvmATUvPFiNBws1qSzqhzgGcKMCo1WXUOME4U4JBS7551pd40UJF0gAsDZIbOF2xCar5gE1LzBZuQmi/8EnGAqaBhrzW1b9uzTmoJR6Umq04qwCGl3j3rSr1poCLpABcGyAydL9iE1HzBJqTmCzYhNV/4JeIAU0HDXmtq37ZnndQSjkpNVp1UgENKvXvWlXrTQEXSAS4MkBk6X7AJqfmCTUjNF2xCSr4AnoZCQt9IP0QmAN7GtgpC30h3vATBMYebEKM7msFwzOGHEOXX3ieVjhkgCrTUzGXuuC3+uwAHuH2AUamdmgFL7reM2/r8zYEDdIAdnoFXHG4JD2ntX3r/34CVZ0w9f3PQIOcAFwbYwhYzcA7UM7AFB9jTlJYDnD+D1vavvb92/M3BQXCAqgEaY4wxxhgTJ+UbYNPUy4lPadEAAAAASUVORK5CYII="></img>
                                </Link>
                            </div>
                            <div className="candidato">
                                <h2>Candidato</h2>
                                <Link to={'/signup'} className="border">
                                    <img src="data:image/png;base64,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"></img>
                                </Link>
                            </div>
                        </div>
                    </SelectUser>
                </div>
            </div>
        </div>
    </CardLogin>
  )
}

export default SelectRegister;