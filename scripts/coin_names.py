from os import path
import shutil

names = open("coin_names.txt")

print_str = "["
max_columns = 3
column_count = 0
for name in names:
    name = name.strip()
    end_index = 0
    for index in range(len(name)-1, 0, -1):
        nchar = name[index]
        if nchar == " " or not nchar.isupper():
            end_index = index + 1
            break
    full_name = name[0:end_index].strip()
    shortname = name[end_index:].strip().lower()
    if path.exists(f"icon/{shortname}.svg"):
        print_str += f"\"{full_name}\""
        shutil.copyfile(
            f"icon/{shortname}.svg",
            f"assets/{full_name.lower().replace(' ', '_')}.svg")
        column_count += 1
        if column_count == max_columns:
            column_count = 0
            print_str += "],\n["
        else:
            print_str += ", "
if print_str.endswith(", "):
    print_str = f"{print_str[:-2]}]"
print(print_str)
