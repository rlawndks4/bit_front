import { Col, Row, Title2, Title3 } from "src/components/elements/styled-components";
import { Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";

const req_table_head = [
    '키',
    '설명',
    '필수',
    '타입',
];
const req_table_body = [

]
const res_table_head = [
    '키',
    '설명',
    '타입',
];
const res_table_body = [

]
const MsgSendMass = (props) => {
    return (
        <>
            <Title2 style={{ margin: '1rem 0' }}>문자보내기(대량)</Title2>
            <Title3 style={{ fontWeight: 'normal', color: '#777' }}>
                각각 다른 내용의 문자를 500명에게 동시 전송하실 수 있습니다.<br />
                사이트내 엑셀전송하기와 동일한 기능이며, 수신인1~500 / 내용1~500 을 각각 설정할 수 있습니다.<br />
                단문(SMS),장문(LMS) 구분을 직접 선택하셔야 하며 혼용은 불가합니다.<br />
                title(문자제목)항목은 LMS,MMS에만 적용되며, 설정시 1~500번 문자에 공통으로 적용됩니다.<br />
                그림문자(사진첨부) 전송시 수신번호별 개별설정이 불가능하므로 동일사진 첨부시에만 사용하시기 바랍니다.<br />
            </Title3>
            <Title3>
                [ Request ]
            </Title3>
            <Col style={{ padding: '2rem', background: '#222', rowGap: '0.5rem' }}>
                <Row style={{ columnGap: '0.5rem' }}>
                    <div style={{ color: '#fff' }}>POST</div>
                    <div style={{ color: 'yellow' }}>/api/msg/v1/send_mass</div>
                    <div style={{ color: '#fff' }}>HTTP/1.1</div>
                </Row>
                <Row style={{ columnGap: '0.5rem' }}>
                    <div style={{ color: '#fff' }}>Host:</div>
                    <div style={{ color: 'orange' }}>{process.env.API_URL}</div>
                </Row>
                <Row style={{ columnGap: '0.5rem' }}>
                    <div style={{ color: '#fff' }}>Service Port:</div>
                    <div style={{ color: 'orange' }}>443</div>
                </Row>
            </Col>
            <Title3 style={{ fontWeight: 'normal', color: '#777' }}>
                HTTPS 프로토콜을 사용하여 POST로 요청합니다. 예약설정을 통해 예약문자로 등록이 가능하며, 파일첨부를 통해 MMS 전송이 가능합니다.
            </Title3>
            <Table style={{ border: '1px solid #ccc' }}>
                <TableHead>
                    <TableRow sx={{ padding: '1rem 0' }}>
                        {req_table_head.map(text => (
                            <>
                                <TableCell style={{ textAlign: 'center' }}>
                                    {text}
                                </TableCell>
                            </>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {req_table_body.map(col => (
                        <>
                            <TableRow sx={{ padding: '1rem 0' }}>
                                {col && col.map(row => (
                                    <>
                                        <TableCell style={{ textAlign: 'center' }}>
                                            {row}
                                        </TableCell>
                                    </>
                                ))}
                            </TableRow>
                        </>
                    ))}
                </TableBody>
            </Table>
            <Title3>
                [ Response ]
            </Title3>
            <Title3 style={{ fontWeight: 'normal', color: '#777' }}>
                응답 바디는 JSON 객체로 구성됩니다.
            </Title3>
            <Table style={{ border: '1px solid #ccc' }}>
                <TableHead>
                    <TableRow sx={{ padding: '1rem 0' }}>
                        {res_table_head.map(text => (
                            <>
                                <TableCell style={{ textAlign: 'center' }}>
                                    {text}
                                </TableCell>
                            </>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {res_table_body.map(col => (
                        <>
                            <TableRow sx={{ padding: '1rem 0' }}>
                                {col && col.map(row => (
                                    <>
                                        <TableCell style={{ textAlign: 'center' }}>
                                            {row}
                                        </TableCell>
                                    </>
                                ))}
                            </TableRow>
                        </>
                    ))}
                </TableBody>
            </Table>
        </>
    )
}
export default MsgSendMass;