function fsValue_(field) {
  if (!field) return null;

  if (field.stringValue !== undefined) return field.stringValue;
  if (field.integerValue !== undefined) return Number(field.integerValue);
  if (field.doubleValue !== undefined) return field.doubleValue;
  if (field.booleanValue !== undefined) return field.booleanValue;
  if (field.timestampValue !== undefined) return field.timestampValue;

  if (field.arrayValue)
    return (field.arrayValue.values || []).map(fsValue_);

  if (field.mapValue)
    return fsFields_(field.mapValue.fields);

  return null;
}

function fsFields_(fields = {}) {
  const obj = {};
  Object.keys(fields).forEach(key => {
    obj[key] = fsValue_(fields[key]);
  });
  return obj;
}

function mapDoc_(doc) {
  return {
    id: doc.name.split('/').pop(),
    ...fsFields_(doc.fields),
  };
}