/*
 * Copyright 2016 Palantir Technologies, Inc. All rights reserved.
 *
 * Licensed under the terms of the LICENSE file distributed with this project.
 */

import * as React from "react";

import {
    Button,
    Classes,
    InputGroup,
    Intent,
    Menu,
    MenuItem,
    Popover,
    Position,
    Spinner,
    Switch,
    Tag,
    Tooltip,
} from "@blueprintjs/core";
import { Example, handleBooleanChange, handleStringChange, IExampleProps } from "@blueprintjs/docs-theme";

export interface IInputGroupExampleState {
    disabled: boolean;
    filterValue: string;
    large: boolean;
    showPassword: boolean;
    tagValue: string;
}

export class InputGroupExample extends React.PureComponent<IExampleProps, IInputGroupExampleState> {
    public state: IInputGroupExampleState = {
        disabled: false,
        filterValue: "",
        large: false,
        showPassword: false,
        tagValue: "",
    };

    private handleDisabledChange = handleBooleanChange(disabled => this.setState({ disabled }));
    private handleLargeChange = handleBooleanChange(large => this.setState({ large }));
    private handleFilterChange = handleStringChange(filterValue => this.setState({ filterValue }));
    private handleTagChange = handleStringChange(tagValue => this.setState({ tagValue }));

    public render() {
        const { disabled, filterValue, large, showPassword, tagValue } = this.state;

        const maybeSpinner = filterValue ? <Spinner className={Classes.SMALL} /> : undefined;

        const lockButton = (
            <Tooltip content={`${showPassword ? "Hide" : "Show"} Password`} disabled={disabled}>
                <Button
                    disabled={disabled}
                    icon={showPassword ? "unlock" : "lock"}
                    intent={Intent.WARNING}
                    minimal={true}
                    onClick={this.handleLockClick}
                />
            </Tooltip>
        );

        const permissionsMenu = (
            <Popover
                content={
                    <Menu>
                        <MenuItem text="can edit" />
                        <MenuItem text="can view" />
                    </Menu>
                }
                disabled={disabled}
                position={Position.BOTTOM_RIGHT}
            >
                <Button disabled={disabled} minimal={true} rightIcon="caret-down">
                    can edit
                </Button>
            </Popover>
        );

        const resultsTag = <Tag minimal={true}>{Math.floor(10000 / Math.max(1, Math.pow(tagValue.length, 2)))}</Tag>;

        return (
            <Example options={this.renderOptions()} {...this.props}>
                <InputGroup
                    disabled={disabled}
                    large={large}
                    leftIcon="filter"
                    onChange={this.handleFilterChange}
                    placeholder="Filter histogram..."
                    rightElement={maybeSpinner}
                    value={filterValue}
                />
                <InputGroup
                    disabled={disabled}
                    large={large}
                    placeholder="Enter your password..."
                    rightElement={lockButton}
                    type={showPassword ? "text" : "password"}
                />
                <InputGroup
                    disabled={disabled}
                    large={large}
                    leftIcon="tag"
                    onChange={this.handleTagChange}
                    placeholder="Find tags"
                    rightElement={resultsTag}
                    value={tagValue}
                />
                <InputGroup
                    disabled={disabled}
                    large={large}
                    placeholder="Add people or groups..."
                    rightElement={permissionsMenu}
                />
            </Example>
        );
    }

    private renderOptions() {
        const { disabled, large } = this.state;
        return (
            <>
                <Switch label="Disabled" onChange={this.handleDisabledChange} checked={disabled} />
                <Switch label="Large" onChange={this.handleLargeChange} checked={large} />
            </>
        );
    }

    private handleLockClick = () => this.setState({ showPassword: !this.state.showPassword });
}
