import { PackageExpiration } from '../PackageExpiration/PackageExpiration';
import './ExtraPackages.css'
import { useEffect, useState } from 'react';

export const ExtraPackages = ({packages}) => {
    const [collapsed, setCollapsed] = useState(true);
    const [containerClass, setContainerClass] = useState(['extraPackagesContainer']);
    const [titleClassName, setTitleClassName] = useState(['extraPackagesTitle']);

    const handleCollapse = () => {
        setCollapsed(!collapsed);
    }

    useEffect(() => {
        setContainerClass(collapsed ? ['extraPackagesContainer'] : ['extraPackagesContainer', 'extraPackagesContainerExpanded']);
        setTitleClassName(collapsed ? ['extraPackagesTitle'] : ['extraPackagesTitle', 'extraPackagesTitleExpanded']);
    }, [collapsed]);

    return (
        <div className={containerClass.join(' ')} onClick={handleCollapse} >
            <h2 className={titleClassName.join(' ')}> {collapsed ? 'Mostrar todos' : 'Mostrar menos'} </h2>
            { !collapsed && packages.map((p) => (
                <PackageExpiration altColor key={p.expireDate} purchasedPachage={p} />
            ))}
        </div>
    );
}