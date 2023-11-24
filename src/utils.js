import { msInADay } from './constants';

export const calculateUserClasses = (purchasedPackages) => {
    let availableClasses = 0;
    const today = new Date();
    purchasedPackages.forEach((p) => {
        if (new Date(p.expireDate) > today) {
            availableClasses += p.availableClasses;
        }
    });
    return availableClasses;
}

export const daysForPackageToExpire = (packageToCalculate) => {
    const today = new Date();
    const earliestPackage = packageToCalculate;
    const earliestPackageDate = new Date(earliestPackage.expireDate);
    const differenceInTime = earliestPackageDate.getTime() - today.getTime();
    const differenceInDays = differenceInTime / msInADay;
    return Math.round(differenceInDays);
}

export const selectEarliestPackage = (purchasedPackages) => {
    const today = new Date();
    const filteredPackages = purchasedPackages.filter((p) => (p.availableClasses > 0 && new Date(p.expireDate) > today));
    if(!filteredPackages.length) return null;
    let earliestPackage = filteredPackages[0];
    filteredPackages.forEach((p) => {
        if (
            new Date(p.expireDate) < new Date(earliestPackage.expireDate) 
            && p.availableClasses > 0 ) {
            earliestPackage = p;
        }
    });
    return earliestPackage;
}