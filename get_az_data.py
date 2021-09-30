import boto3
import json

data_dict = {}
instance_by_az = {}


def get_regions():
    ec2 = boto3.client('ec2', region_name="us-east-1")
    data = ec2.describe_regions(AllRegions=True)
    # print(json.dumps(data, indent=2, default=str))
    return data


def get_instance_offering_for_region(region):
    rtn_list = []
    print("Processing {}".format(region))
    ec2 = boto3.client('ec2', region_name=region)
    paginator = ec2.get_paginator("describe_instance_type_offerings")
    pages = paginator.paginate(LocationType="availability-zone")
    for page in pages:
        # print(json.dumps(page, indent=2, default=str))
        for ot in page["InstanceTypeOfferings"]:
            rtn_list.append(ot)
    return rtn_list


regions = get_regions()
for region in regions["Regions"]:
    if "not-opted-in" in region["OptInStatus"]:
        continue
    if region["RegionName"] not in data_dict:
        data_dict[region["RegionName"]] = {}
    offerings = get_instance_offering_for_region(region["RegionName"])
    for offering in offerings:
        if offering["Location"] not in data_dict[region["RegionName"]]:
            data_dict[region["RegionName"]][offering["Location"]] = []
        data_dict[region["RegionName"]][offering["Location"]].append(offering["InstanceType"])

        if offering["InstanceType"] not in instance_by_az:
            instance_by_az[offering["InstanceType"]] = []
        instance_by_az[offering["InstanceType"]].append(offering["Location"])


with open("base_ui/src/data/instance_by_az.json", "w") as outfile:
    # out_dict = {
    #     "by_region": data_dict,
    #     "by_instance_type": instance_by_az 
    # }
    out_list = []
    for region in data_dict:
        for az in data_dict[region]:
            for offering in data_dict[region][az]:
                out_list.append({"region": region, "instance_type": offering, "az": az})
    json.dump(out_list, outfile, indent=2)
