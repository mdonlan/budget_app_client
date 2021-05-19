import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom'
import styled from 'styled-components'

export function Top_Nav(props) {

    // const history = useHistory();
    const logged_in = useSelector(state => state.default.logged_in);
    // const [path, set_path] = useState(null);

    useEffect(() => {
        console.log('render top_nav')
        // set_path(history.location.pathname);
        // console.log(path)
        console.log('location: ' + props.location.pathname)
    }, [props.location.pathname])

    return (
        <Wrapper>
            <Styled_Link path={props.location.pathname} to="/" >Budget</Styled_Link>
            {!logged_in &&
                <React.Fragment>
                    <Styled_Link path={props.location.pathname} to="/register">register</Styled_Link>
                    <Styled_Link path={props.location.pathname} to="/login">login</Styled_Link>
                </React.Fragment>
            }
            {logged_in &&
                <React.Fragment>
                    <Styled_Link path={props.location.pathname} to="/transactions">transactions</Styled_Link>
                    <Styled_Link path={props.location.pathname} to="/accounts">accounts</Styled_Link>
                </React.Fragment>
            }
        </Wrapper>
    )
}

const Wrapper = styled.div`
    background: #444444;
    height: 50px;
    display: flex;
    align-items: center;
`

const Styled_Link = styled(Link)`
    margin-left: 8px;
    margin-right: 8px;
    text-decoration: none;
    color: ${props => props.path == props.to ? "white" : "gray"};
    cursor: pointer;
`
