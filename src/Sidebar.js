import React, { useState } from 'react';
import styled from 'styled-components';

const Sidebar = (props) => {
  const { links } = props;
  const [selectedMenus, setSelectedMenus] = useState([]);
  const handleMenuSelection = (tag, depth) => {
    console.debug('clickedTag', tag)
    setSelectedMenus((selectedMenus) => {
      const newSelectedMenus = [...selectedMenus];
      // trim any menus after the depth
      console.debug(newSelectedMenus)
      newSelectedMenus.length = depth;
      if (tag) {
        newSelectedMenus[depth] = tag
      }
      return newSelectedMenus;
    });
  };

  return (
    <Sidebar.Wrapper>
      <Sidebar.List>
        {links.map((tag) => {
          return (
            <SidebarItem
              tag={tag}
              handleMenuSelection={handleMenuSelection}
              key={tag.name}
              selectedMenus={selectedMenus}
            />
          );
        })}
      </Sidebar.List>
      {
        selectedMenus.map((level, index) => (
          <SidebarItem.List depth={index + 1}>
            {
              level.children.map((tag, tagIndex) => (
                <SidebarItem
                  tag={tag}
                  handleMenuSelection={handleMenuSelection}
                  key={`child-${tag.name}-${tagIndex}`}
                  depth={index + 1}
                  selectedMenus={selectedMenus}
                />
              ))
            }
          </SidebarItem.List>
        ))
      }
    </Sidebar.Wrapper>
  );
};

const SidebarItem = ({
  tag,
  handleMenuSelection,
  selectedMenus,
  depth = 0,
}) => {
  const { id, name, path, children = [] } = tag;
  return (
    <>
      {children.length > 0 ? (
        <SidebarItem.Item>
          <SidebarItem.Label
            onClick={() => handleMenuSelection(tag, depth)}
          >
            {name}
          </SidebarItem.Label>
        </SidebarItem.Item>
      ) : (
        <SidebarItem.Item>
          <SidebarItem.Anchor>{name}</SidebarItem.Anchor>
        </SidebarItem.Item>
      )}
    </>
  );
};

Sidebar.Wrapper = styled.nav`
  background: white;
  display: block;
  border-right: 1px solid lightgrey;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;

Sidebar.List = styled.ul`
  
`;

SidebarItem.List = styled.ul``;

SidebarItem.Item = styled.li`
  position: relative;
`;
SidebarItem.Anchor = styled.span`
  display: block;
  width: 100%;
  height: 100%;
  padding: 20px;
  text-decoration: none;
  color: black;
`;
SidebarItem.Label = styled.span`
  position: relative;
  padding: 20px;
  width: 100%;
  display: block;
  &::after {
    position: absolute;
    content: '\\276F';
    right: 10px;
  }
`;

export default Sidebar;
