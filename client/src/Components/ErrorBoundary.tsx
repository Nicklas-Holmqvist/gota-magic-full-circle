import { Component, CSSProperties, ErrorInfo, ReactNode } from 'react';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import {  Grid } from '@material-ui/core';

interface Props {
    children: ReactNode;
}

interface State {
    hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {

    public state: State = {
        hasError: false
    }

    static getDerivedStateFromError(_: Error): State {
        return {
            hasError: true
        };
    }

    public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error("Uncaught error:", error, errorInfo);
    }

    public render() {
        if (this.state.hasError) {
            return (
                <Grid container 
                    justify="center" 
                    alignItems="center" 
                    className="landingContainer" 
                    style={landingContainer}
                >

                <div style={errorStyle}>
                    <h2>Trasigt tihi</h2>
                    <Link to="/">
                        <Button variant="contained" color="primary">
                            Tillbaka till Startsidan
                        </Button>
                    </Link>
                </div>

                </Grid>
            );
        }
        return this.props.children
    }
}


const landingContainer: CSSProperties = {
    backgroundImage: 'url(./assets/imgs/what-the-hex.png)',    
    height: '100%',   
}


const errorStyle: CSSProperties = {
    marginTop: '8rem',
    position: 'relative',
    top: '0',
    bottom: '0',
    right: '0',
    left: '0',
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
}

export default ErrorBoundary;